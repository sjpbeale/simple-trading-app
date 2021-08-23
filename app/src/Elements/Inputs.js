// Styled Input Elements
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputLabel = styled.label`
	flex: 1;

	& + & {
		margin-left: 10px;
	}
	
	> span {
		font-size: 0.9em;
		font-weight: bold;
	}
`;

const InputElement = styled.input`
	display: block;
	padding: 8px 5px;
	margin: 5px 0 0;
	border: 1px solid transparent;
	border-radius: 4px;
	outline: none;
	width: 100%;
	color: rgb(255, 255, 255);
	background: rgb(25, 31, 48);

	&.error {
		border: 1px solid darkred;
	}
`;

export const Input = forwardRef((props, ref) => {

	const { label, ...rest } = props;

	return (
		<InputLabel>
			{label ? <span>{label}</span> : null}
			<InputElement {...rest} ref={ref} />
		</InputLabel>
	);
});

const SelectElement = styled.select`
	display: block;
	padding: 7px 5px;
	margin: 5px 0 0;
	border: none;
	border-radius: 4px;
	outline: none;
	width: 100%;
	color: rgb(255, 255, 255);
	background: rgb(25, 31, 48);
`;

export const Select = (props) => {

	const { label, children, ...rest } = props;

	return (
		<InputLabel>
			{label ? <span>{label}</span> : null}
			<SelectElement {...rest}>
				{ children }
			</SelectElement>
		</InputLabel>
	);
};
