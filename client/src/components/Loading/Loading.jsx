import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loading.scss'

const Loading = ({ endpoint }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate(endpoint)
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
