import React from 'react'
import Header from '../Header/Header'

import './Dashboard.css'

const Dashboard = () => {
	return (
		<div>
			<Header />
			<main className="dashboard-content">
                <header>
                    <h1>Дашборд за 30 дней</h1>
                </header>

                <div class="grid-container">
                    <div className="grid-item">
                        Баланс
                    </div>
                    <div className="grid-item">объем</div>
                    <div className="grid-item">LS</div>
                    <div className="grid-item">+</div>
                    <div className="grid-item">PnL</div>
                    <div className="grid-item">-</div>
                    <div className="grid-item">индекс</div>
                    <div className="grid-item">время</div>
                </div>
			</main>
		</div>
	)
}

export default Dashboard
