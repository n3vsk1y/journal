import React from 'react'
import Header from '../Header/Header'

const Profile = () => {
	const username = 'Вася Пушкин'

	return (
		<div>
			<Header username={username} />
			<main className="profile-content">
				<h1>Профиль</h1>
			</main>
		</div>
	)
}

export default Profile
