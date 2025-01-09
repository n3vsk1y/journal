import React, { useState } from 'react'
import Header from '../Header/Header'
import Trade from '../Trade/Trade'
import './Trades.css' // Для стилизации таблицы и заголовков

const Trades = () => {
	const trades = [
		{
			positionId: '1875452700445073408',
			symbol: 'HMSTR-USDT',
			isolated: false,
			positionSide: 'SHORT',
			openTime: 1735977743000,
			updateTime: 1736179785000,
			avgPrice: '0.003397',
			avgClosePrice: '0.003533',
			realisedProfit: '-6.347851',
			netProfit: '-6.413817',
			positionAmt: '46838',
			closePositionAmt: '46838',
			leverage: 10,
			closeAllPositions: true,
			positionCommission: '-0.1623047285',
			totalFunding: '0.09633861515777174',
		},
		{
			positionId: '1875452700445073409',
			symbol: 'BTC-USDT',
			isolated: false,
			positionSide: 'SHORT',
			openTime: 1735977743000,
			updateTime: 1736179785000,
			avgPrice: '0.003397',
			avgClosePrice: '0.003533',
			realisedProfit: '-6.347851',
			netProfit: '0',
			positionAmt: '46838',
			closePositionAmt: '46838',
			leverage: 10,
			closeAllPositions: true,
			positionCommission: '-0.1623047285',
			totalFunding: '0.09633861515777174',
		},
		{
			positionId: '1875452700445073410',
			symbol: '1000FLOKI-USDT',
			isolated: false,
			positionSide: 'SHORT',
			openTime: 1735977743000,
			updateTime: 1736179785000,
			avgPrice: '0.003397',
			avgClosePrice: '0.003533',
			realisedProfit: '-6.347851',
			netProfit: '6.413817',
			positionAmt: '46838',
			closePositionAmt: '46838',
			leverage: 10,
			closeAllPositions: true,
			positionCommission: '-0.1623047285',
			totalFunding: '0.09633861515777174',
		},
	]

	const [openTradeId, setOpenTradeId] = useState(null)

	const toggleTrade = (tradeId) => {
		setOpenTradeId(openTradeId === tradeId ? null : tradeId)
	}

	return (
		<div>
			<Header />
			<div className="trade-list">
				<div className="trades-header">
					<span>ID</span>
					<span>Тикер</span>
                    <span>Сторона</span>
					<span>Дата открытия</span>
					<span>Дата закрытия</span>
					<span>Прибыль</span>
					<span>Объем</span>
				</div>

				{trades.map((trade) => (
					<Trade
						key={trade.positionId}
						trade={trade}
						isOpen={openTradeId === trade.positionId}
						toggleTrade={() => toggleTrade(trade.positionId)}
					/>
				))}
			</div>
		</div>
	)
}

export default Trades
