// TradeChart.jsx
import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

const formatDate = (timestamp) => {
	if (!timestamp) return null
	// Обрабатываем как число (timestamp) или строку
	const date =
		typeof timestamp === 'number'
			? new Date(timestamp)
			: new Date(timestamp)
	return date.toISOString().split('T')[0]
}

const TradeChart = ({ candleData, entry, exit, stopLoss, takeProfit }) => {
	const chartContainerRef = useRef(null)

	useEffect(() => {
		if (!chartContainerRef.current || !candleData) return

		const chart = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 300,
			layout: {
				background: { color: '#030e22' },
				textColor: '#7d7d7d',
			},
			grid: {
				vertLines: { color: '#2B2B43' },
				horzLines: { color: '#2B2B43' },
			},
			timeScale: {
				timeVisible: true,
			},
		})

		// Форматируем время для свечей
		const formattedCandleData = candleData.map((candle) => ({
			...candle,
			time: formatDate(candle.time),
		}))

		const candleSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		})

		candleSeries.setData(formattedCandleData)

		// Маркеры входа/выхода
		const markers = []
		if (entry) {
			markers.push({
				time: formatDate(entry.time),
				position: 'belowBar',
				color: entry.direction === 'long' ? '#00FF00' : '#FF0000',
				shape: 'arrowUp',
				text: `${entry.direction.toUpperCase()} Entry: ${entry.price.toFixed(
					2
				)}`,
			})
		}
		if (exit) {
			markers.push({
				time: formatDate(exit.time),
				position: 'aboveBar',
				color: entry.direction === 'long' ? '#FF0000' : '#00FF00',
				shape: 'arrowDown',
				text: `Exit: ${exit.price.toFixed(2)}`,
			})
		}
		if (markers.length > 0) candleSeries.setMarkers(markers)

		// Линии SL/TP
		if (stopLoss) {
			const lineSeries = chart.addLineSeries()
			lineSeries.setData([
				{ time: formattedCandleData[0].time, value: stopLoss },
				{
					time: formattedCandleData[formattedCandleData.length - 1]
						.time,
					value: stopLoss,
				},
			])
			lineSeries.applyOptions({
				color: '#FF0000',
				lineWidth: 1,
				lineStyle: 2,
			})
		}

		const handleResize = () => {
			chart.applyOptions({ width: chartContainerRef.current.clientWidth })
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			chart.remove()
		}
	}, [candleData, entry, exit, stopLoss, takeProfit])

	if (!candleData) {
		return <div className="chart-error">No chart data available</div>
	}

	return (
		<div
			ref={chartContainerRef}
			style={{
				width: '100%',
				height: '300px',
				borderRadius: '8px',
				overflow: 'hidden',
			}}
		/>
	)
}

export default TradeChart
