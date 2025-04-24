import React, { useRef, useState, useEffect } from 'react';
import TradeChart from './TradeChart';

const TradeRow = ({ trade, isOpen, toggleTrade }) => {
    const detailsRef = useRef(null);
    const [processedData, setProcessedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.style.height = isOpen
                ? `${detailsRef.current.scrollHeight}px`
                : '0px';
        }
    }, [isOpen]);

    useEffect(() => {
        const loadData = async () => {
            if (isOpen && !processedData) {
                try {
                    setLoading(true);
                    const data = await processTradeData(trade);
                    setProcessedData(data);
                } catch (e) {
                    setError('Failed to load chart data');
                } finally {
                    setLoading(false);
                }
            }
        };

        loadData();
    }, [isOpen, trade, processedData]);

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
                    {parseFloat(trade.positionAmt * trade.avgPrice).toFixed(2)} $
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
                        <p><b>Плечо:</b></p>
                        <p><b>Средняя цена открытия:</b></p>
                        <p><b>Средняя цена закрытия:</b></p>
                        <p><b>Реализованная прибыль:</b></p>
                        <p><b>Комиссия:</b></p>
                        <p><b>Фандинг:</b></p>
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

                    {/* <div className="trade-chart">
                        {loading && <div className="chart-loading">Loading chart...</div>}
                        {error && <div className="chart-error">{error}</div>}
                        {processedData && !loading && !error && (
                            <TradeChart
                                candleData={processedData.candleData}
                                entry={{
                                    time: processedData.entry.time,
                                    price: processedData.entry.price,
                                    direction: processedData.entry.direction
                                }}
                                exit={{
                                    time: processedData.exit.time,
                                    price: processedData.exit.price
                                }}
                                stopLoss={processedData.stopLoss}
                                takeProfit={processedData.takeProfit}
                            />
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

const processTradeData = async (trade) => {
    const fetchCandleData = async () => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${trade.symbol.replace('-', '')}&interval=5m&startTime=${trade.openTime}&endTime=${trade.updateTime}`
            );
            const klines = await response.json();
            
            return klines.map(k => ({
                time: k[0],
                open: parseFloat(k[1]),
                high: parseFloat(k[2]),
                low: parseFloat(k[3]),
                close: parseFloat(k[4])
            }));
            
        } catch (error) {
            console.error('Error fetching candle data:', error);
            return generateMockCandles(trade);
        }
    };

    const generateMockCandles = (trade) => {
        const candles = [];
        const timeStep = (trade.updateTime - trade.openTime) / 5;
        
        for (let i = 0; i < 5; i++) {
            candles.push({
                time: trade.openTime + i * timeStep,
                open: parseFloat(trade.avgPrice) + i * 0.1,
                high: parseFloat(trade.avgPrice) + i * 0.15,
                low: parseFloat(trade.avgPrice) - i * 0.05,
                close: parseFloat(trade.avgPrice) + i * 0.1
            });
        }
        candles[candles.length - 1].close = parseFloat(trade.avgClosePrice);
        return candles;
    };

    const calculateStopLoss = (trade) => {
        const price = parseFloat(trade.avgPrice);
        return trade.positionSide === 'LONG' 
            ? price * 0.98 
            : price * 1.02;
    };

    const calculateTakeProfit = (trade) => {
        const price = parseFloat(trade.avgPrice);
        return trade.positionSide === 'LONG' 
            ? price * 1.03 
            : price * 0.97;
    };

    return {
        candleData: await fetchCandleData(),
        entry: {
            time: trade.openTime,
            price: parseFloat(trade.avgPrice),
            direction: trade.positionSide.toLowerCase()
        },
        exit: {
            time: trade.updateTime,
            price: parseFloat(trade.avgClosePrice)
        },
        stopLoss: calculateStopLoss(trade),
        takeProfit: calculateTakeProfit(trade)
    };
};

export default TradeRow;