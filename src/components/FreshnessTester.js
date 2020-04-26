import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FreshnessRing from './FreshnessRing';
import Input, { Label } from './Input';
import { blur, toInt } from '../utils';

const FreshnessTesterContainer = styled.div`
	display: flex;
	align-items: center;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-right: 24px;

	& > * + * {
		margin-top: 12px;
	}
`;

const sum = array =>
	array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const calculateFreshnessScore = (freshnessFactors, factorValues) => {
	const weights = [];
	const weightedFactorScores = Object.keys(freshnessFactors).map(
		factorKey => {
			const { min, max, weight } = freshnessFactors[factorKey];
			const factorValue = factorValues[factorKey];
			const score = 1 - (factorValue - min) / (max - min);
			const weightedScore = score * weight;

			weights.push(weight);

			return weightedScore;
		}
	);

	const totalWeightedScores = sum(weightedFactorScores);
	const totalWeights = sum(weights);

	return totalWeightedScores / totalWeights;
};

const FreshnessTester = ({ state, setState }) => {
	const { demo, freshnessFactors } = state;

	const updateDemo = (factorKey, evt) => {
		const newValue = toInt(evt.target.value);

		setState(currentState => ({
			...currentState,
			demo: {
				...currentState.demo,
				[factorKey]: newValue,
			},
		}));
	};

	return (
		<FreshnessTesterContainer>
			<InputContainer>
				{Object.keys(freshnessFactors).map(factorKey => {
					const { label } = freshnessFactors[factorKey];
					const demoValue = demo[factorKey];
					return (
						<Label key={factorKey}>
							{label}:{' '}
							<Input
								value={demoValue}
								onKeyDown={blur}
								onChange={updateDemo.bind(this, factorKey)}
							/>
						</Label>
					);
				})}
			</InputContainer>
			<FreshnessRing
				score={calculateFreshnessScore(freshnessFactors, demo)}
				size="large"
			/>
		</FreshnessTesterContainer>
	);
};

export default FreshnessTester;
