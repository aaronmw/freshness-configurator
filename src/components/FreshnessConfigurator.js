import React from 'react';
import styled from 'styled-components';
import FreshnessRing from './FreshnessRing';
import Input from './Input';
import Table, { Cell } from './Table';
import { blur, roundTo, toInt } from '../utils';

const StyledDaysFromFreshness = styled.div`
	opacity: 0.5;
`;

const DaysFromFreshness = ({ score, max, min }) => {
	const daysSince = (1 - score) * (max - min) + min;

	return (
		<StyledDaysFromFreshness>
			{roundTo(daysSince, 5)}
		</StyledDaysFromFreshness>
	);
};

const FreshnessConfigurator = ({ state, setState }) => {
	const { freshnessFactors } = state;

	const setFactor = (factorName, prop, val) => {
		setState(currentState => ({
			...currentState,
			freshnessFactors: {
				...currentState.freshnessFactors,
				[factorName]: {
					...currentState.freshnessFactors[factorName],
					[prop]: val,
				},
			},
		}));
	};

	return (
		<Table>
			<thead>
				<tr>
					<Cell as="th">&nbsp;</Cell>
					<Cell as="th">
						<FreshnessRing score="0" />
					</Cell>
					<Cell as="th">
						<FreshnessRing score="0.25" />
					</Cell>
					<Cell as="th">
						<FreshnessRing score="0.5" />
					</Cell>
					<Cell as="th">
						<FreshnessRing score="0.75" />
					</Cell>
					<Cell as="th">
						<FreshnessRing score="1" />
					</Cell>
					<Cell as="th">Weight</Cell>
				</tr>
			</thead>
			<tbody>
				{Object.keys(freshnessFactors).map(factorName => {
					const {
						label,
						min,
						max,
						tempMin,
						tempMax,
						weight,
					} = freshnessFactors[factorName];

					const handleFocusMax = () => {
						setFactor(factorName, 'tempMax', max);
					};

					const handleBlurMax = () => {
						setFactor(factorName, 'max', Math.max(min, tempMax));
						setFactor(factorName, 'tempMax', null);
					};

					const handleFocusMin = () => {
						setFactor(factorName, 'tempMin', min);
					};

					const handleBlurMin = () => {
						setFactor(factorName, 'min', Math.min(max, tempMin));
						setFactor(factorName, 'tempMin', null);
					};

					return (
						<tr key={factorName}>
							<Cell
								as="th"
								scope="row"
								style={{ textAlign: 'right' }}
							>
								{label}:
							</Cell>
							<Cell as="td">
								<Input
									value={tempMax || max}
									onFocus={handleFocusMax}
									onBlur={handleBlurMax}
									onKeyDown={blur}
									onChange={evt => {
										setFactor(
											factorName,
											'tempMax',
											toInt(evt.target.value)
										);
									}}
								/>
							</Cell>
							<Cell as="td">
								<DaysFromFreshness
									score={0.25}
									max={tempMax || max}
									min={tempMin || min}
								/>
							</Cell>
							<Cell as="td">
								<DaysFromFreshness
									score={0.5}
									max={tempMax || max}
									min={tempMin || min}
								/>
							</Cell>
							<Cell as="td">
								<DaysFromFreshness
									score={0.75}
									max={tempMax || max}
									min={tempMin || min}
								/>
							</Cell>
							<Cell as="td">
								<Input
									value={tempMin || min}
									onFocus={handleFocusMin}
									onBlur={handleBlurMin}
									onKeyDown={blur}
									onChange={evt =>
										setFactor(
											factorName,
											'tempMin',
											toInt(evt.target.value)
										)
									}
								/>
							</Cell>
							<Cell as="td">
								<Input
									value={weight}
									onKeyDown={blur}
									onChange={evt =>
										setFactor(
											factorName,
											'weight',
											toInt(evt.target.value)
										)
									}
								/>
							</Cell>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default FreshnessConfigurator;
