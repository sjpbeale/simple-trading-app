// Styled Button Element
import styled from 'styled-components';

export const Button = styled.button`
	font-size: 1em;
	font-weight: bold;
	border: none;
	border-radius: 2px;
	padding: 7px 20px;
	margin: ${(props) => props.margin ?? '0'};
	color: white;
	background: rgb(85, 0, 252);
	transition: background 0.3s linear 0s;
	cursor: pointer;

	& + & {
		margin-left: 10px;
	}

	&:hover {
		background: rgba(85, 0, 252, 0.8);
	}

	&:disabled {
		background: lightslategrey;
		opacity: 0.7;
		pointer-events: none;
	}
`;

export const BuyButton = styled(Button)`
	flex: 1;
	background: rgb(89, 210, 169);
	margin-top: 10px;

	&:hover {
		background: rgba(89, 210, 169, 0.8);
	}
`;

export const SellButton = styled(Button)`
	flex: 1;
	background: rgb(238, 95, 95);
	margin-top: 10px;

	&:hover {
		background: rgba(238, 95, 95, 0.8);
	}
`;
