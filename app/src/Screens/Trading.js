/**
 * Trading Screen
 */
import { useState, useEffect } from 'react';
import { useAuth } from 'Auth/AuthContext';
import { apiGet, apiPost } from 'Utils/apiFetch';
import { Row, Col } from 'react-flexa';

import { Title } from 'Elements/Layout';
import PlaceOrder from 'Components/Trading/PlaceOrder';
import DisplayOrders from 'Components/Trading/DisplayOrders';
import Deposit from 'Components/Trading/Deposit';
import DisplayDeposits from 'Components/Trading/DisplayDeposits';

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

		let deposits = await apiGet('getBalances', {
			auth: credentials,
		});

		if (deposits.length) {

			deposits[0].new = true;

			setDeposits(deposits);

			setTimeout(() => {
				setDeposits(deposits.map((item) => {
					delete item.new;
					return item;
				}));
			}, 1000);
		}

		return status;
	};

	const sendOrder = async (data) => {

		const order = await apiPost('placeOrder', {
			...data,
			auth: credentials
		});

		if (order.error) {
			throw order;
		}

		let orders = await apiGet('getOrders', {
			auth: credentials,
		});

		orders = orders.map((item) => {
			if (item.id === order.orderId) {
				item.new = true;
			}
			return item;
		});

		setOrders(orders);

		setTimeout(() => {
			setOrders(orders.map((item) => {
				delete item.new;
				return item;
			}));
		}, 1000);

		return order;
	};

	const cancelOrder = async (data) => {
		try {

			await apiPost('cancelOrder', {
				id: data,
				auth: credentials,
			});

			const orders = await apiGet('getOrders', {
				auth: credentials,
			});

			if (!Array.isArray(orders)) {
				throw new Error('Unexpected type orders response');
			}

			setOrders(orders);

		} catch (err) {

		}
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

	// Fetch orders on load
	useEffect(() => {
		(async () => {
			try {

				const orders = await apiGet('getOrders', {
					auth: credentials,
				});

				if (!Array.isArray(orders)) {
					throw new Error('Unexpected type orders response');
				}

				setOrders(orders);

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
				<PlaceOrder
					sendOrder={sendOrder}
				/>
			</Col>
			<Col xs={12} md={8} lg={6}>
				<DisplayOrders
					orders={orders}
					cancelOrder={cancelOrder}
				/>
			</Col>
			<Col xs={12} md={12} lg={3}>
				<Row>
					<Col xs={12} md={4} lg={12}>
						<Deposit
							sendDeposit={sendDeposit}
						/>
					</Col>
					<Col xs={12} md={8} lg={12}>
						<DisplayDeposits
							deposits={deposits}
						/>
					</Col>
				</Row>
			</Col>
		</Row>
		</>
	);
};

export default Trading;
