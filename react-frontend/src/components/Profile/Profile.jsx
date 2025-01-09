import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../providers/UserContext'
import { setbio } from '../../Api'
import Header from '../Header/Header'
import Settings from '../Settings/Settings'
import Loading from '../Loading/Loading'
import './Profile.css'

const Profile = () => {
	const navigate = useNavigate()
	const { user, updateUser } = useUser()
	const [isLoading, setIsLoading] = useState(true)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const [editableBio, setEditableBio] = useState(user?.bio || '')

    console.log(user);
    

	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen)
	}

	const handleBioChange = async (e) => {
		e.preventDefault()

		try {
			await setbio({ new_bio: String(editableBio) })

			updateUser({ bio: editableBio })
		} catch (error) {
			console.error('Ошибка при сохранении биографии:', error)
		}
	}

	useEffect(() => {
        if (user) {
			setIsLoading(false)
			setEditableBio(user.bio || '')
		} else {
			const savedUserData = localStorage.getItem('user')
			if (savedUserData) {
				setIsLoading(false)
				const parsedData = JSON.parse(savedUserData)
				setEditableBio(parsedData.bio || '')
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
						<textarea
							className="bio"
							value={editableBio}
							onChange={(e) => setEditableBio(e.target.value)}
							onBlur={handleBioChange}
							placeholder="Напишите что-нибудь о себе..."
                            spellCheck="false"
						/>
					</div>
				</div>
				<button
					className="settings glow-button"
					onClick={toggleSettings}
				>
					Настройки
				</button>
				<Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
			</main>
		</div>
	)
}

export default Profile
