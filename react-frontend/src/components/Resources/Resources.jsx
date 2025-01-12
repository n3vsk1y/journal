import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import './Resources.css'

import psycho from './img/psycho.jpg'
import risk from './img/risk.webp'
import strategy from './img/strategy.png'
import news from './img/news.webp'


const Resources = () => {
    const navigate = useNavigate();

	return (
		<>
			<Header />
			<div className="resources-grid">
				<div
					className="resource-block"
					style={{ backgroundImage: `url(${psycho})` }}
                    onClick={() => navigate('/psychology')}
				>
					<div className="overlay">
						<h3 className="res-h3">Психология</h3>
					</div>
				</div>

				<div
					className="resource-block"
					style={{ backgroundImage: `url(${risk})` }}
				>
					<div className="overlay">
						<h3 className="res-h3">Риск-менеджмент</h3>
					</div>
				</div>

				<div
					className="resource-block"
					style={{ backgroundImage: `url(${strategy})` }}
				>
					<div className="overlay">
						<h3 className="res-h3">Стратегии торговли</h3>
					</div>
				</div>

				<div
					className="resource-block"
					style={{ backgroundImage: `url(${news})` }}
				>
					<div className="overlay">
						<h3 className="res-h3">Новости и события</h3>
					</div>
				</div>
			</div>
		</>
	)
}

export default Resources
