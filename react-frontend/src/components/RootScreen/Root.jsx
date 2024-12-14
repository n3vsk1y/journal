import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Root.css'

const RootScreen = () => {
	const navigate = useNavigate()

	return (
		<>
			<div>
				<h1>Welcome Logo</h1>
				<div id="btns">
					<button onClick={() => navigate('/login')}>Log In</button>
					<button onClick={() => navigate('/signup')}>Sign Up</button>
				</div>
			</div>
		</>
	)
}

export default RootScreen
