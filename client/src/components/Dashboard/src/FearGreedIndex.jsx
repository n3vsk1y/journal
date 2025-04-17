import { useState, useEffect } from 'react'
import './FearGreedIndex.css'

const FearGreedIndex = () => {
	const [value, setValue] = useState(10)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://api.alternative.me/fng/?limit=1'
				)
				const data = await response.json()

				if (data?.data?.[0]?.value) {
					setValue(parseInt(data.data[0].value))
				} else {
					throw new Error('Некорректные данные от API')
				}
			} catch (err) {
				setError(err.message)
				console.error('Ошибка при загрузке индекса:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
		const interval = setInterval(fetchData, 300000) // update каждые 5 мин
		return () => clearInterval(interval)
	}, [])

	if (isLoading) return <div className="loading">Загрузка...</div>
	if (error) return <div className="error">Ошибка: {error}</div>

	return (
        <div className="mini-gauge" style={{ '--value': value }}>
            <div className="mini-gauge-fill"></div>
            <div className="mini-gauge-cover">{value}</div>
        </div>
	)
}

export default FearGreedIndex
