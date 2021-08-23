/**
 * Deposit Controller
 */

// Simple in memory store - normally would be db (mongo etc)
const depositStore = {};

class DepositController {

	/**
	 * Deposit
	 *
	 * Requires associated address and deposit data,
	 * simple validation prior to inserting to memory
	 * store.
	 *
	 * @param {string} address Wallet Address.
	 * @param {object} deposit Deposit information.
	 * @return {boolean}
	 */
	static async deposit(address, deposit = {}) {

		if (address) {

			if (!depositStore[address]) {
				depositStore[address] = [];
			}

			const amount = Number(deposit.amount);
			const token = String(deposit.token).toUpperCase();

			if (isNaN(amount) || amount < 0) {
				throw new Error(`Invalid amount: ${amount}`);
			}

			if (!['ETH', 'USDT', 'DVF'].includes(token)) {
				throw new Error(`Invalid token: ${token}`);
			}

			// Makeshift id since we are not saving to DB
			const id = token + new Date().getTime();

			depositStore[address].push({
				id,
				amount,
				token,
			});

			return true;
		}

		return false;
	}

	/**
	 * List deposits
	 *
	 * Looks up deposits using provided address and
	 * returns in reverse order.
	 *
	 * @param {string} address Wallet Address.
	 * @return {array}
	 */
	static async list(address) {

		if (address) {
			const deposits = depositStore[address] || [];
			return [...deposits].reverse();
		}

		return [];
	}
};

export default DepositController;
