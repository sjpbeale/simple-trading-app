/**
 * Place Order Component
 */
import { useState, useRef } from 'react';
import { Section, SectionTitle, Flex, StatusMessage } from 'Elements/Layout';
import { Input, TitleSelect } from 'Elements/Inputs';
import { BuyButton, SellButton } from 'Elements/Buttons';
import { isPositiveNumber } from 'Utils/Validation';
import styled from 'styled-components';

const PlaceOrderTitle = styled(SectionTitle)`
	justify-content: space-between;
	align-items: center;
	padding: 7px 8px;
`;

const PlaceOrder = ({ sendOrder }) => {

	const [orderEnabled, setOrderEnabled] = useState(true);
	const [orderStatus, setOrderStatus] = useState({
		status: '',
		message: '',
	});

	const [token, setToken] = useState('ETH/USDT');
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(1000);

	const amountInput = useRef(null);
	const priceInput = useRef(null);

	const [amountToken, priceToken] = token.split('/');

	const handleChange = (event) => {

		const target = event.target;

		// Highlight invalid input
		if (['amount', 'price'].includes(target.name)) {
			if (!isPositiveNumber(target.value)) {
				target.classList.add('error');
			} else {
				target.classList.remove('error');
			}
		}

		switch(target.name) {
			case 'amount':
				setAmount(target.value);
				break;
			case 'price':
				setPrice(target.value);
				break;
			default:
				setToken(target.value);
				break;
		}
	};

	const handleOrder = async (side) => {

		if (!isPositiveNumber(amount)) {
			amountInput.current.classList.add('error');
			amountInput.current.focus();
			return;
		}

		if (!isPositiveNumber(price)) {
			priceInput.current.classList.add('error');
			priceInput.current.focus();
			return;
		}

		try {
			setOrderEnabled(false);
			setOrderStatus({status: '', message: ''});

			await sendOrder({
				side,
				amount,
				price,
				token: amountToken,
			});

			setTimeout(() => {
				setOrderEnabled(true);
			}, 1200);

		} catch (err) {

			let errorMessage = 'Error placing order, please try again.';

			if (err.statusCode === 400) {
				errorMessage = err.message;
			}

			setOrderStatus({
				status: 'error',
				message: errorMessage,
			});

			setOrderEnabled(true);
		}
	};

	return (
		<Section>
			<PlaceOrderTitle>
				<span>Buy/Sell</span>
				<TitleSelect
					onChange={handleChange}
					value={token}
				>
					<option>ETH/USDT</option>
					<option>DVF/USDT</option>
				</TitleSelect>
			</PlaceOrderTitle>

			<Flex>
				<Input
					name="amount"
					label={`Amount ${amountToken}`}
					type="text"
					value={amount}
					onChange={handleChange}
					ref={amountInput}
				/>
				<Input
					name="price"
					label={`Price ${priceToken}`}
					type="text"
					value={price}
					onChange={handleChange}
					ref={priceInput}
				/>
			</Flex>
				
			<Flex>
				<BuyButton
					onClick={() => handleOrder('buy')}
					disabled={!orderEnabled}
				>
					{`Buy ${amountToken}`}
				</BuyButton>
				<SellButton
					onClick={() => handleOrder('sell')}
					disabled={!orderEnabled}
				>
					{`Sell ${amountToken}`}
				</SellButton>
			</Flex>

			{orderStatus.status ? (
				<StatusMessage status={orderStatus.status}>
					{orderStatus.message}
				</StatusMessage>
			) : null}
		</Section>
	);
};

export default PlaceOrder;
