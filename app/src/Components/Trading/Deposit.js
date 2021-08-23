/**
 * Deposit Component
 */
import { useState, useRef } from 'react';
import { Section, SectionTitle, Flex } from 'Elements/Layout';
import { Input, Select } from 'Elements/Inputs';
import { Button } from 'Elements/Buttons';
import { isPositiveNumber } from 'Utils/Validation';

const Deposit = ({ sendDeposit }) => {

	const [depositEnabled, setDepositEnabled] = useState(true);

	const [amount, setAmount] = useState(0);
	const [token, setToken] = useState('ETH');

	const amountInput = useRef(null);

	const handleChange = (event) => {
		if (event.target.name === 'amount') {

			// Highlight invalid input
			if (!isPositiveNumber(event.target.value)) {
				event.target.classList.add('error');
			} else {
				event.target.classList.remove('error');
			}

			setAmount(event.target.value);
		} else {
			setToken(event.target.value);
		}
	};

	const handleDeposit = async () => {

		if (!isPositiveNumber(amount)) {
			amountInput.current.classList.add('error');
			amountInput.current.focus();
			return;
		}

	};

	return (
		<Section>
			<SectionTitle>Deposits</SectionTitle>

			<Flex alignItems="flex-end">
				<Input
					name="amount"
					label="Amount"
					type="text"
					value={amount}
					onChange={handleChange}
					ref={amountInput}
				/>
				<Select
					name="token"
					label="Token"
					value={token}
					onChange={handleChange}
				>
					<option>ETH</option>
					<option>USDT</option>
					<option>DVF</option>
				</Select>

				<Button
					onClick={handleDeposit}
					disabled={!depositEnabled}
					margin="0 0 0 10px"
				>
					Deposit
				</Button>
			</Flex>

		</Section>
	);
};

export default Deposit;
