/**
 * Connect Component
 */
import { Redirect } from 'react-router-dom';
import { useAuth } from 'Auth/AuthContext';

import { Title } from 'Elements/Layout';
import { Button } from 'Elements/Buttons';
import styled from 'styled-components';

const ConnectContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 60px);
`;

const Connect = () => {

	const auth = useAuth();
	const { authorised, connect, connecting } = auth;

	const handleConnect = () => {
		connect();
	};

	return !authorised ? (
		<>
		<Title>CONNECT</Title>
		<ConnectContainer>
			<Button
				onClick={handleConnect}
				disabled={connecting}
			>
				Connect Wallet
			</Button>
		</ConnectContainer>
		</>
	) : (
		<Redirect to="/trading" />
	);
};

export default Connect;
