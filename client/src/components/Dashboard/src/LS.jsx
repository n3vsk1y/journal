import React from 'react'

const PieChart = ({ long }) => {
	const longPercent = long
	const shortPercent = 100 - long
	const radius = 25
	const circumference = 2 * Math.PI * radius

	return (
		<svg width="200" height="200" viewBox="0 0 100 100">
			<defs>
				<linearGradient
					id="greenGradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#5CD27C" />
					<stop offset="100%" stopColor="#72EF1F" />
				</linearGradient>

				<linearGradient
					id="redGradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#FF0000" />
					<stop offset="100%" stopColor="#F3B626" />
				</linearGradient>
			</defs>

			<circle // зеленый
                className="green-glow"
				cx="50"
				cy="50"
				r={radius}
				fill="none"
				stroke="url(#greenGradient)"
				strokeWidth={radius * 2}
				strokeDasharray={`${
					(longPercent / 100) * circumference
				} ${circumference}`}
				transform="rotate(-90 50 50)"
			/>

			<circle // красный
                className="red-glow"
				cx="50"
				cy="50"
				r={radius}
				fill="none"
				stroke="url(#redGradient)"
				strokeWidth={radius * 2}
				strokeDasharray={`${
					(shortPercent / 100) * circumference
				} ${circumference}`}
				strokeDashoffset={`-${(longPercent / 100) * circumference}`}
				transform="rotate(-90 50 50)"
			/>
		</svg>
	)
}

export default PieChart
