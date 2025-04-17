import React from 'react'
import Header from '../Header/Header'

import Balance from './src/Balance'
import Volume from './src/Volume'
import Time from './src/Time'
import PnL from './src/PnL'
import PieChart from './src/LS'
import Plus from './src/Plus'
import FearGreedIndex from './src/FearGreedIndex'
import Minus from './src/Minus'


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
                    <div className="grid-item"><Balance /></div>
                    <div className="grid-item"><Volume /></div>
                    <div className="grid-item green-border">
                        <span className="bold-header">Распределение по Long ⁄ Short</span>
                        <div className="chart">
                            <PieChart long={80} />
                        </div>
                        <span>
                            <span className="ls short">50</span>
                            <span className="ls long">50</span>
                        </span>
                    </div>
                    <div className="grid-item"><Plus /></div>
                    <div className="grid-item"><PnL  /></div>
                    <div className="grid-item"><Minus /></div>
                    <div className="grid-item">
                        <span className="bold-header">Индекс страха ⁄ жадности</span>
                        <FearGreedIndex />
                    </div>
                    <div className="grid-item"><Time /></div>
                </div>
			</main>
		</div>
	)
}

export default Dashboard
