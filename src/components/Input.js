import styled from 'styled-components';

const Label = styled.label`
	cursor: pointer;
`;

const Input = styled.input.attrs({
	type: 'number',
})`
	border: 1px solid #8e8ba1;
	border-radius: 4px;
	padding: 6px 12px;
	text-align: center;
	width: 60px;

	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export { Label };

export default Input;
