import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { roundTo } from '../utils';

const FRESHNESS_RING_SIZES = {
	normal: { diameter: 40, fontSize: 1, strokeWidth: 5 },
	large: { diameter: 80, fontSize: 2, strokeWidth: 10 },
};

const FRESHNESS_RING_COLORS = {
	neutral: {
		bar: '#8e8ba1',
		text: '#8e8ba1',
		track: '#f8f8fb',
	},
	green: {
		bar: '#56bfb8',
		text: '#338681',
		track: '#eff7f6',
	},
	yellow: {
		bar: '#f4b13f',
		text: '#cc840c',
		track: '#fcf7ec',
	},
	red: {
		bar: '#e94f60',
		text: '#d02029',
		track: '#f9e6e8',
	},
};

const FreshnessRingContainer = styled.div(
	({ diameter }) => `
        display: inline-block;
		position: relative;
		width: ${diameter}px;
		height: ${diameter}px;

		svg {
			position: absolute;
			top: 0;
			left: 0;
		}
	`
);

const StyledFreshnessRing = styled.circle(
	({ circumference, offset }) => `
		transition: all 1s ease-in-out 0.5s;
		transition-property: stroke-dashoffset stroke;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
		paint-order: stroke;
		fill: white;
		stroke-dasharray: ${circumference} ${circumference};
		stroke-dashoffset: ${offset};
	`
);

const FreshnessScore = styled.div(
	({ color, size }) => `
        transition: color 1s ease-in-out 0.5s;
        color: ${FRESHNESS_RING_COLORS[color].text};
        font-size: ${FRESHNESS_RING_SIZES[size].fontSize * 14}px;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `
);

const FreshnessRing = ({ size = 'normal', score }) => {
	const roundedScore = Math.min(roundTo(score, 0.05), 1);
	const { diameter, strokeWidth } = FRESHNESS_RING_SIZES[size];
	const radius = diameter / 2;
	const shapeRadius = radius - strokeWidth;
	const circumference = shapeRadius * 2 * Math.PI;
	const [offset, setOffset] = useState(circumference);
	const [color, setColor] = useState('neutral');

	useEffect(() => {
		setOffset(circumference - roundedScore * circumference);
		setColor(
			roundedScore >= 0.65
				? 'green'
				: roundedScore >= 0.45
				? 'yellow'
				: 'red'
		);
	}, [circumference, offset, score, roundedScore]);

	return (
		<FreshnessRingContainer diameter={diameter}>
			<svg width={diameter} height={diameter}>
				<StyledFreshnessRing
					stroke={FRESHNESS_RING_COLORS[color].track}
					strokeWidth={strokeWidth * 2}
					fill="transparent"
					r={shapeRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
			<svg width={diameter} height={diameter}>
				<StyledFreshnessRing
					circumference={circumference}
					offset={offset}
					stroke={FRESHNESS_RING_COLORS[color].bar}
					strokeWidth={strokeWidth * 2}
					fill="transparent"
					r={shapeRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
			<FreshnessScore color={color} size={size}>
				{roundTo(roundedScore * 100, 5)}
			</FreshnessScore>
		</FreshnessRingContainer>
	);
};

export default FreshnessRing;
