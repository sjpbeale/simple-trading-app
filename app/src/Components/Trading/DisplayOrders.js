/**
 * Display Orders Component
 */
import { memo } from 'react';

import { Section, SectionTitle, Table } from 'Elements/Layout';

const DisplayOrders = ({ orders = [] }) => {
	return (
		<Section>
			<SectionTitle>Placed Orders</SectionTitle>
			<Table>
				<thead>
					<tr>
						<th>Side</th>
						<th>Token</th>
						<th>Amount</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((row, rowIdx) => {

						const {
							side,
							token,
							amount,
							price,
						} = row;

						return (
							<tr
								className={row.new ? `${side} new` : side}
								key={rowIdx}
							>
								<td>{side.toUpperCase()}</td>
								<td>{token}</td>
								<td>{amount}</td>
								<td>{price}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</Section>
	);
};

export default memo(DisplayOrders);
