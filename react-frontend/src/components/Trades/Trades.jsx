import React from 'react'
import Header from '../Header/Header'

const Trades = () => {
	const username = 'Вася Пушкин'

	return (
		<div>
			<Header username={username} />
			<main className="trades-content">
				<h1>Сделки</h1>
			</main>
		</div>
	)
}

export default Trades
