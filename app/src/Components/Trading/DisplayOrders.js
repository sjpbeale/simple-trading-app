/**
 * Display Orders Component
 */
import { memo } from 'react';
import styled from 'styled-components';

import { Section, SectionTitle, Table } from 'Elements/Layout';
import CloseIcon from '@material-ui/icons/Close';

// Style order table for cancel icon
const OrderTable = styled(Table)`
	thead {
		th:last-child {
			width: 35px;
		}
	}

	tbody {

		tr {

			svg.cancel-order {
				width: 1em;
				height: 1em;
				font-size: 1.25em;
				color: rgba(255, 255, 255, 0.2);
				transition: color 0.3s ease-out 0s;

				&:hover {
					cursor: pointer;
				}
			}

			&:hover {
				svg.cancel-order {
					color: rgba(255, 0, 0, 1);
				}
			}
		}
	}
`;

const DisplayOrders = ({ cancelOrder, orders = [] }) => {
	return (
		<Section>
			<SectionTitle>Placed Orders</SectionTitle>
			<OrderTable>
				<thead>
					<tr>
						<th>Side</th>
						<th>Token</th>
						<th>Amount</th>
						<th>Price</th>
						<th></th>
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
								<td>
									<CloseIcon
										className="cancel-order"
										viewBox="2 0 20 20"
										onClick={() => cancelOrder(row.id)}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</OrderTable>
		</Section>
	);
};

export default memo(DisplayOrders);
