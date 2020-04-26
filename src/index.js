import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import FreshnessConfigurator from './components/FreshnessConfigurator';
import FreshnessTester from './components/FreshnessTester';

const GlobalStyle = createGlobalStyle`
	* { 
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: inherit;
		font-weight: inherit;
	}
	:root {
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        height: 100vh;
	}
`;

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 50vh;
`;

const FreshnessTesterContainer = styled(AppContainer)`
	background-color: #f8f8fb;
`;

const commonFactorProps = { tempMin: null, tempMax: null };

const INITIAL_STATE = {
	demo: {
		daysSinceLastUsed: 45,
		daysSinceLastReviewed: 30,
	},
	freshnessFactors: {
		daysSinceLastUsed: {
			...commonFactorProps,
			min: 45,
			max: 180,
			weight: 1,
			label: 'Days since last used',
		},
		daysSinceLastReviewed: {
			...commonFactorProps,
			min: 30,
			max: 90,
			weight: 1,
			label: 'Days since last reviewed',
		},
	},
};

const Heading = styled.h1`
	margin-bottom: 48px;
	font-weight: 400;
	font-size: 24px;
`;

function App() {
	const [state, setState] = useState(INITIAL_STATE);

	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<Heading>Freshness Configurator</Heading>
				<FreshnessConfigurator state={state} setState={setState} />
			</AppContainer>
			<FreshnessTesterContainer>
				<Heading>Config Tester</Heading>
				<FreshnessTester state={state} setState={setState} />
			</FreshnessTesterContainer>
		</>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
