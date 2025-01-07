import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import './Profile.css'
import { useUser } from '../../providers/UserContext'
import Settings from '../Settings/Settings'
import Loading from '../Loading/Loading'

const Profile = () => {
    const navigate = useNavigate()
	const { user } = useUser()
    const [isLoading, setIsLoading] = useState(true)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen)
	}

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		} else {
			const savedUserData = localStorage.getItem('user')
			if (savedUserData) {
				setIsLoading(false)
			} else {
				setIsLoading(true)
			}
		}
	}, [user])

    if (isLoading) {
        return <Loading endpoint="/profile" />
    }

    if (!user && !localStorage.getItem('user')) {
        navigate('/login')
    }

	return (
		<div>
			<Header />
			<main className="profile-content">
				<div className="profile-container">
					<div className="avatar">
						<img src={user.avatar_url} alt="Avatar" />
					</div>
					<div className="profile-info">
						<p className="username">{user.username}</p>
						<p className="email">{user.email}</p>
						<p
							className="bio"
							style={{
								color: user.bio ? 'white' : 'var(--bg-text)',
							}}
						>
							{user.bio || 'Напишите что-нибудь о себе...'}
						</p>
					</div>
				</div>
				<button
					className="settings glow-button"
					onClick={toggleSettings}
				>
				Настройки
				</button>
                <Settings
					isOpen={isSettingsOpen}
					onClose={toggleSettings}
				/>
			</main>
		</div>
	)
}

export default Profile
