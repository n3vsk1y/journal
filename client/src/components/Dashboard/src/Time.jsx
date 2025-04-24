import { useState, useEffect } from 'react'
import './Time.css'

const Time = () => {
	const [time, setTime] = useState(new Date())
	const [exchanges, setExchanges] = useState([])

	const exchangeConfig = [
		{
			name: 'NYSE',
			open: 9.5, // 09:30 EST
			close: 16, // 16:00 EST
			timezone: 'America/New_York',
			symbol: '🇺🇸',
		},
		{
			name: 'NASDAQ',
			open: 9.5,
			close: 16,
			timezone: 'America/New_York',
			symbol: '🇺🇸',
		},
		{
			name: 'SHANGHAI',
			open: 9, // 09:00 CST
			close: 15, // 15:00 CST
			timezone: 'Asia/Shanghai',
			symbol: '🇨🇳',
		},
		{
			name: 'EURONEXT',
			open: 8, // 08:00 CET
			close: 16.5, // 16:30 CET
			timezone: 'Europe/Paris',
			symbol: '🇪🇺',
		},
	]

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date()
			setTime(now)

			const updatedExchanges = exchangeConfig.map((exchange) => {
				const options = {
					timeZone: exchange.timezone,
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				}

				const localTime = now.toLocaleTimeString('en-US', options)
				const localHours = now
					.toLocaleTimeString('en-US', {
						...options,
						hour: 'numeric',
					})
					.split(':')[0]

				const isOpen =
					parseFloat(localHours) >= exchange.open &&
					parseFloat(localHours) < exchange.close

				return {
					...exchange,
					localTime,
					status: isOpen ? '🟢 OPEN' : '🔴 CLOSED',
				}
			})

			setExchanges(updatedExchanges)
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className="time-container">
			<div className="current-time">
				{time.toLocaleTimeString()} (UTC)
			</div>

			<div className="exchanges-list">
				{exchanges.map((exchange, index) => (
					<div key={index} className="exchange-item">
						<span className="exchange-symbol">
							{exchange.symbol}
						</span>
						<span className="exchange-name">{exchange.name}</span>
						<span className="exchange-time">
							{exchange.localTime}
						</span>
						<span
							className={`exchange-status ${
								exchange.status.includes('OPEN')
									? 'open'
									: 'closed'
							}`}
						>
							{exchange.status}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default Time
