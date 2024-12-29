import React from 'react'
import Header from '../Header/Header'

const Dashboard = () => {
	const username = 'Вася Пушкин'

	return (
		<div>
			<Header username={username} />
			<main className="dashboard-content">
				<h1>Добро пожаловать в Дашборд!</h1>
			</main>
		</div>
	)
}

export default Dashboard
