/**
 * Trading Screen
 */
import { useState, useEffect } from 'react';
import { useAuth } from 'Auth/AuthContext';
import { Row, Col } from 'react-flexa';

import { Title } from 'Elements/Layout';

const Trading = () => {

	const auth = useAuth();
	const { credentials } = auth;

	const [orders, setOrders] = useState([]);
	const [deposits, setDeposits] = useState([]);

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
						<div>Deposit</div>
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
