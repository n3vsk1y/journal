import React, { useState } from 'react'
import './LogIn.css'
import { login } from '../../Api'

const LogInScreen = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	// async function handleLogin(event) {
	// 	event.preventDefault()
	// 	try {
	// 		const response = await login(username, password)
	// 		localStorage.setItem('token', response.token)
	// 		setSuccess(true)
	// 		setError('')
	// 	} catch (err) {
	// 		setError(err.message)
	// 		setSuccess(false)
	// 	}
	// }

	async function handleLogin(event) {
		event.preventDefault()
		try {
			const response = await login(username, password)
			console.log('Response from server:', response) // Debug: Проверка ответа
			setSuccess(true)
			setError('')
		} catch (err) {
			console.error('Error during slogin:', err)
			setError(err.message || 'Unknown error occurred')
			setSuccess(false)
		}
	}

	return (
		<div>
			<h1>Log In</h1>
			<form onSubmit={handleLogin}>
				<div class="input-wrapper">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<span class="focus-border"></span>
				</div>
				<div class="input-wrapper">
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<span class="focus-border"></span>
				</div>
				<button type="submit">Log In</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>Login successful!</p>}
		</div>
	)
}

export default LogInScreen
