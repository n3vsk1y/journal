import React from 'react'
import Header from '../Header/Header'

const Resources = () => {
	const username = 'Вася Пушкин'

	return (
		<div>
			<Header username={username} />
			<main className="resources-content">
				<h1>Материалы</h1>
			</main>
		</div>
	)
}

export default Resources
