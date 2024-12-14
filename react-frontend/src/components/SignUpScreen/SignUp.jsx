import React, { useState } from 'react'
import './SignUp.css'
import { signup } from '../../Api'

const SignUpScreen = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	async function handleSignup(event) {
		event.preventDefault()
		try {
			await signup(email, username, password)
			setSuccess(true)
			setError('')
		} catch (err) {
			setError(err.message)
			setSuccess(false)
		}
	}

	return (
		<div>
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
				<button type="submit">Sign Up</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && (<p style={{ color: 'green' }}>Registration successful!</p>)}
		</div>
	)
}

export default SignUpScreen
