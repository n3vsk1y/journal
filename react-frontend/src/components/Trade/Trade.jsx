import React, { useRef } from 'react'

const TradeRow = ({ trade, isOpen, toggleTrade }) => {
	const detailsRef = useRef(null)

	React.useEffect(() => {
		if (detailsRef.current) {
			detailsRef.current.style.height = isOpen
				? `${detailsRef.current.scrollHeight}px`
				: '0px'
		}
	}, [isOpen])

	return (
		<div className="trade-row">
			{/* Основная строка */}
			<div className="trade-summary" onClick={toggleTrade}>
				<span>{trade.positionId}</span>
				<span>{trade.symbol}</span>
				<span>{new Date(trade.openTime).toLocaleString()}</span>
				<span>{new Date(trade.updateTime).toLocaleString()}</span>
				<span
					className={
						parseFloat(trade.netProfit) < 0
							? 'negative'
							: parseFloat(trade.netProfit) > 0
							? 'positive'
							: 'neutral'
					}
				>
					{parseFloat(trade.netProfit).toFixed(2)} $
				</span>
				<span>{trade.positionAmt} $</span>
			</div>

			{/* Детали сделки */}
			<div
				ref={detailsRef}
				className="trade-details"
				style={{
					overflow: 'hidden',
					transition: 'height 0.3s ease-out',
				}}
			>
				<div className="trade-info">
					<p>Плечо: x{trade.leverage}</p>
					<p>Средняя цена открытия: {trade.avgPrice} $</p>
					<p>Средняя цена закрытия: {trade.avgClosePrice} $</p>
					<p>Реализованная прибыль: {trade.realisedProfit} $</p>
					<p>Комиссия: {trade.positionCommission} $</p>
					<p>Фандинг: {trade.totalFunding} $</p>
				</div>
				<div className="trade-chart">
					<p>График</p>
				</div>
			</div>
		</div>
	)
}

export default TradeRow
