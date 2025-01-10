import React, { useState } from 'react'
import { getTrades } from '../../Api'

import Header from '../Header/Header'
import Trade from '../Trade/Trade'
import './Trades.css'

const Trades = () => {
	const [trades, setTrades] = useState([])
	const [openTradeId, setOpenTradeId] = useState(null)
	const [error, setError] = useState('')
	const [filters, setFilters] = useState({
		symbol: '',
		startDate: '',
		endDate: '',
	})

	const toggleTrade = (tradeId) => {
		setOpenTradeId(openTradeId === tradeId ? null : tradeId)
	}

	const handleFilterChange = (e) => {
		const { name, value } = e.target
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	const handleSymbolInput = (e) => {
		const { value } = e.target
		setFilters((prevFilters) => ({
			...prevFilters,
			symbol: value.toUpperCase(),
		}))
	}

	const applyFilters = async () => {
		const { startDate, endDate } = filters
		const now = Math.floor(Date.now() / 1000)

		if (!startDate || !filters.symbol) {
			setError('Укажите стартовую дату и тикер')
			return
		}

		const start_time = Math.floor(new Date(startDate).getTime() / 1000)
		let end_time = Math.floor(new Date(endDate).getTime() / 1000)

		if (start_time > end_time) {
			setError('Стартовая дата не может быть позже конечной')
			return
		}

		if (end_time > now) {
			setError('Конечная дата не может быть позже текущего времени')
			return
		}

        if (Number.isNaN(end_time)) {
            end_time = now
        }
		setError('')

		try {
			const response = await getTrades(filters.symbol, start_time, end_time)
            console.log('API Response:', response)
            console.log('Trades:', response?.data?.data?.data?.positionHistory)
            console.log(trades)
            const tradesData = response?.data?.data?.data?.positionHistory;
            const tradesArray = tradesData ? Object.values(tradesData) : [];
            setTrades(tradesArray);
		} catch (error) {
			console.error('Ошибка при получении сделок:', error)
			setError(error?.message || 'Ошибка при получении сделок')
		}
	}
	return (
		<div>
			<Header />
			<div className="trade-list">
				<div className="trades-filters">
					<input
						type="text"
						name="symbol"
						placeholder="Введите тикер"
						value={filters.symbol}
						onChange={handleSymbolInput}
						spellCheck="false"
					/>
					<input
						type="datetime-local"
						name="startDate"
						placeholder="Стартовая дата"
						value={filters.startDate}
						onChange={handleFilterChange}
						required
					/>
					<input
						type="datetime-local"
						name="endDate"
						placeholder="Конечная дата"
						value={filters.endDate}
						onChange={handleFilterChange}
					/>
					<button
						onClick={applyFilters}
						className="glow-button filters-apply-button"
					>
						Показать сделки
					</button>
				</div>
				{error && <p className="error">{error}</p>}
				<div className="trades-header">
					<span>ID</span>
					<span>Тикер</span>
					<span>Сторона</span>
					<span>Дата открытия</span>
					<span>Дата закрытия</span>
					<span>Прибыль</span>
					<span>Объем</span>
				</div>
                {trades.length === 0 && <p className="empty">Пусто</p>}
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
