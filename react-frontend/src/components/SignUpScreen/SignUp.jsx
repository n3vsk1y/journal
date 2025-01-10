import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, signup } from '../../Api'

const SignUpScreen = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		logout()
	}, [])

	async function handleSignup(event) {
		event.preventDefault()
		try {
			const response = await signup(email, username, password)
			localStorage.setItem('access_token', response.access_token)
			console.log('%c' + 'Success SIGNUP', 'color:' + 'green')
			setError('')
			navigate('/dashboard')
		} catch (err) {
			console.error('Error during signup:', err)
			if (Array.isArray(err.detail)) {
				const messages = err.detail.map((item) => item.msg).join('---')
				setError(messages)
			} else {
				setError(err.detail || 'Unknown error occurred.')
			}
		}
	}

	return (
		<div className="content-div">
			<h1>Sign Up</h1>
			<form onSubmit={handleSignup}>
				<div class="input-wrapper">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<span class="focus-border"></span>
				</div>
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
				<button className="submit glow-button" type="submit">
					Sign Up
				</button>
			</form>
			<button className="back-button" onClick={() => navigate('/')}>
				back
				<span class="right"></span>
				<span class="left"></span>
			</button>
			<div className="input-wrapper">
				<span>{error}</span>
			</div>
		</div>
	)
}

export default SignUpScreen
