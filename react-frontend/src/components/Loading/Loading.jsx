import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loading.scss'

const Loading = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/dashboard')
            location.reload()
		}, 3000)

		return () => clearTimeout(timer)
	}, [navigate])

	return (
		<div className="container">
			<div className="loading-box"></div>
			<div className="loading-box"></div>
			<div className="loading-box"></div>
			<div className="loading-box"></div>
			<div className="loading-box"></div>
		</div>
	)
}

export default Loading
