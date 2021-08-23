/**
 * Orders Controller
 */
import DepositController from '#Controllers/DepositController';

// Simple in memory store - normally would be db (mongo etc)
const ordersStore = {};

class OrdersController {

	/**
	 * Place Order
	 *
	 * Requires associated address and order data, simple
	 * data vaidation prior to inserting to memory store and
	 * returning order id or false on fail.
	 *
	 * @param {string} address Wallet Address.
	 * @param {object} order Order Information.
	 * @return {string|false}
	 */
	static async place(address, order = {}) {

		if (address) {

			if (!ordersStore[address]) {
				ordersStore[address] = [];
			}

			const side = String(order.side).toUpperCase();
			const amount = Number(order.amount);
			const price = Number(order.price);
			const token = String(order.token).toUpperCase();

			if (!['BUY', 'SELL'].includes(side)) {
				throw new Error(`Invalid side: ${side}`);
			}

			if (isNaN(amount) || amount < 0) {
				throw new Error(`Invalid amount: ${amount}`);
			}

			if (isNaN(price) || price < 0) {
				throw new Error(`Invalid price: ${price}`);
			}

			if (!['ETH', 'USDT', 'DVF'].includes(token)) {
				throw new Error(`Invalid token: ${token}`);
			}

			// Check deposits for specified token
			const deposits = await DepositController.list(address);

			const depositsTotal = deposits.reduce((acc, curr) => {
				return curr.token === token ? acc + curr.amount : acc;
			}, 0);

			// Check orders for specified token
			const orders = await OrdersController.list(address);

			const ordersTotal = orders.reduce((acc, curr) => {
				return curr.token === token ? acc + curr.amount : acc;
			}, 0);

			// Check deposited funds vs placed orders + new order
			if ((ordersTotal + amount) > depositsTotal) {
				throw new Error(`Insufficient funds (${token})`);
			}

			// Makeshift id since we are not saving to DB
			const id = token + new Date().getTime();

			ordersStore[address].push({
				id,
				side,
				amount,
				price,
				token,
			});

			console.log(`PLACED ${side} @ ${price} ${amount}`);

			return id;
		}

		return false;
	}

	/**
	 * Cancel Order
	 *
	 * Requires associated address and order id to lookup
	 * and cancel.
	 *
	 * @param {string} address Wallet Address.
	 * @param {string} orderId Id of order to cancel.
	 * @return {boolean}
	 */
	static async cancel(address, orderId) {

		if (!address) {
			throw new Error('Missing address');
		}
		if (!ordersStore[address]) {

			throw new Error('Missing orders data for address');
		}

		const record = ordersStore[address].findIndex(order => order.id === orderId);

		if (!!~record) {

			const { side, price, amount } = ordersStore[address][record];

			const deleted = ordersStore[address].splice(record, 1);

			if (deleted.length) {

				console.log(`CANCELLED ${side} @ ${price} ${amount}`);

				return true;
			}
		}

		return false;
	}

	/**
	 * List orders
	 *
	 * Looks up current orders using provided address and
	 * returns in reverse order.
	 *
	 * @param {string} address Wallet Address.
	 * @return {array}
	 */
	static async list(address) {

		if (address) {
			const orders = ordersStore[address] || [];
			return [...orders].reverse();
		}

		return [];
	}
};

export default OrdersController;
