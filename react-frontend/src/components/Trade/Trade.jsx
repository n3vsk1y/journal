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
			<div className="trade-summary" onClick={toggleTrade}>
				<span>{trade.positionId}</span>
				<span>{trade.symbol}</span>
                <span>{trade.positionSide}</span>
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
				<span>
					{parseFloat(trade.positionAmt * trade.avgPrice).toFixed(2)}{' '}
					$
				</span>
			</div>

			<div
				ref={detailsRef}
				className="trade-details"
				style={{
	                height: '0',
					overflow: 'hidden',
					transition: 'height 0.4s ease-out',
				}}
			>
				<div className="trade-grid">
					<div className="trade-info">
						<p>
							<b>Плечо:</b>
						</p>
						<p>
							<b>Средняя цена открытия:</b>
						</p>
						<p>
							<b>Средняя цена закрытия:</b>
						</p>
						<p>
							<b>Реализованная прибыль:</b>
						</p>
						<p>
							<b>Комиссия:</b>
						</p>
						<p>
							<b>Фандинг:</b>
						</p>
					</div>

					<div className="trade-values">
						<p>x{trade.leverage}</p>
						<p>{trade.avgPrice} $</p>
						<p>{trade.avgClosePrice} $</p>
						<p>{trade.realisedProfit} $</p>
						<p>{parseFloat(trade.positionCommission).toFixed(3)} $</p>
						<p>{parseFloat(trade.totalFunding).toFixed(5)} $</p>
					</div>

					<div className="trade-chart">
						<p>График</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TradeRow
