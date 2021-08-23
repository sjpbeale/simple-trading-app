import styled from 'styled-components';

export const Container = styled.div`
	padding: 10px 8px;
	margin-bottom: 8px;
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: ${(props) => props.direction ?? 'row'};
	align-items: ${(props) => props.alignItems ?? 'normal'};
	justify-content: ${(props) => props.justifyContent ?? 'normal'};
`;

export const Title = styled(Container)`
	font-weight: bold;
`;

export const Section = styled(Container)`
	padding-bottom: 16px;
	background-color: rgb(34,43,66);
	border-radius: 4px;
	overflow: hidden;
`;

export const SectionTitle = styled(Flex)`
	background-color: rgb(39,50,75);
	padding: 10px 8px;
	margin: -10px -8px 14px;
	font-weight: bold;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;

	th {
		padding: 0 10px;
		font-size: 0.9em;
		text-align: left;
		color: rgb(176, 192, 224);
	}

	th:last-child,
	td:last-child {
		text-align: right;
	}

	tbody tr {

		td {
			padding: 2px 10px;
			transition: background 0.3s ease-out 0s;
			font-size: 0.9em;
		}

		&:nth-of-type(odd) td {
			background-color: rgba(100, 160, 220, 0.1);
		}

		&:hover td {
			background-color: rgba(255, 255, 255, 0.3);
		}

		&.new td {
			background-color: rgba(255, 255, 255, 0.3);
		}
	}
`;
