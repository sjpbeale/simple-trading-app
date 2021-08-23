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
