/**
 * Trading Screen
 */
import { useState, useEffect } from 'react';
import { useAuth } from 'Auth/AuthContext';
import { apiGet, apiPost } from 'Utils/apiFetch';
import { Row, Col } from 'react-flexa';

import { Title } from 'Elements/Layout';
import Deposit from 'Components/Trading/Deposit';

const Trading = () => {

	const auth = useAuth();
	const { credentials } = auth;

	const [orders, setOrders] = useState([]);
	const [deposits, setDeposits] = useState([]);

	const sendDeposit = async (token, amount) => {

		const status = await apiPost('deposit', {
			token,
			amount,
			auth: credentials
		});

		if (status.error) {
			throw new Error(`${status.error}: ${status.message}`);
		}

		return status;
	};

	// Fetch deposits on load
	useEffect(() => {
		(async () => {
			try {

				const deposits = await apiGet('getBalances', {
					auth: credentials,
				});

				if (!Array.isArray(deposits)) {
					throw new Error('Unexpected type deposits response');
				}

				setDeposits(deposits);

			} catch (err) {
				// Display error fetching deposits
				console.log(err);
			}
		})();
	}, [credentials]);

	return (
		<>
		<Title>TRADING</Title>
		<Row>
			<Col xs={12} md={4} lg={3}>
				<div>Place Order</div>
			</Col>
			<Col xs={12} md={8} lg={6}>
				<div>Display Orders</div>
			</Col>
			<Col xs={12} md={12} lg={3}>
				<Row>
					<Col xs={12} md={4} lg={12}>
						<Deposit
							sendDeposit={sendDeposit}
						/>
					</Col>
					<Col xs={12} md={8} lg={12}>
						<div>Display Deposits</div>
					</Col>
				</Row>
			</Col>
		</Row>
		</>
	);
};

export default Trading;
