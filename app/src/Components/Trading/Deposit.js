/**
 * Deposit Component
 */
import { useState } from 'react';
import { Section, SectionTitle, Flex } from 'Elements/Layout';
import { Input, Select } from 'Elements/Inputs';
import { Button } from 'Elements/Buttons';

const Deposit = ({ sendDeposit }) => {

	const [depositEnabled, setDepositEnabled] = useState(true);

	const [amount, setAmount] = useState(0);
	const [token, setToken] = useState('ETH');

	const handleChange = (event) => {
		if (event.target.name === 'amount') {
			setAmount(event.target.value);
		} else {
			setToken(event.target.value);
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
