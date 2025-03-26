import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import './Root.css'
import { logout } from '../../Api'

const RootScreen = () => {
	const navigate = useNavigate()

	useEffect(() => {
		logout
	}, [])

	return (
		<>
			<div>
				<div className="logo-wrapper">
					<h1 className="neon-button">Welcome!</h1>
					<h1 className="neon-text">Welcome!</h1>
				</div>
				<div className="root-button-wrapper">
					<button
						className="root-button glow-button"
						onClick={() => navigate('/login')}
					>
						Log In
					</button>
					<button
						className="root-button glow-button"
						onClick={() => navigate('/signup')}
					>
						Sign Up
					</button>
				</div>
				{/* <div className="substrate-wrapper">
                    <p className="substrate">Log In</p>
                    <p className="substrate">Log In</p>
                </div> */}
			</div>
			<div className="root-switch-wrapper">
				<ThemeSwitch />
			</div>
		</>
	)
}

export default RootScreen
