import React from 'react'
import Header from '../Header/Header'

const Trades = () => {
    const fake_trade = {
        positionId: "1875452700445073408",
        symbol: "HMSTR-USDT",
        isolated: false,
        positionSide: "SHORT",
        openTime: 1735977743000,
        updateTime: 1736179785000,
        avgPrice: "0.003397",
        avgClosePrice: "0.003533",
        realisedProfit: "-6.347851",
        netProfit: "-6.413817",
        positionAmt: "46838",
        closePositionAmt: "46838",
        leverage: 10,
        closeAllPositions: true,
        positionCommission: "-0.1623047285",
        totalFunding: "0.09633861515777174"
    };
    

	return (
		<div>
			<Header />
			<main className="trades-content">
				<h1>Сделки</h1>
			</main>
		</div>
	)
}

export default Trades
