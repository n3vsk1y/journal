import React, { useState } from 'react'
import Header from '../Header/Header'
import './Profile.css'
import { useUser } from '../../providers/UserContext'
import Settings from '../Settings/Settings'

const Profile = () => {
	const f_user = {
		avatar_url:
			'https://avatars.mds.yandex.net/i?id=539fc1711db30f5c1ecf5c445dbdf2ff_sr-12814755-images-thumbs&n=13',
		username: 'example',
		email: 'user@example.com',
		bio: 'Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев.',
		bbio: 'Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев.',
	}
	const { user } = useUser()

	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen)
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
