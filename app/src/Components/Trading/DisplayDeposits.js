/**
 * Display Deposits Components
 */
import { memo } from 'react';
import { Section, SectionTitle, Table } from 'Elements/Layout';

const DisplayDeposits = ({ deposits = [] }) => {
	return (
		<Section>
			<SectionTitle>Deposits Balance</SectionTitle>
			<Table>
				<thead>
					<tr>
						<th>Token</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{deposits.map((deposit, idx) => {

						const { token, amount } = deposit;

						return (
							<tr
								className={deposit.new ? 'new' : null}
								key={idx}
							>
								<td>{token}</td>
								<td>{amount}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Section>
	);
};

export default memo(DisplayDeposits);
