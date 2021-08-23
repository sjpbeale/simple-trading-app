/**
 * Deposit Routes
 */
import authentication from '#Hooks/authentication';
import DepositController from '#Controllers/DepositController';

// Deposit Options
const depositOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				amount: { type: 'integer' },
				token: { type: 'string' },
			},
			required: ['amount', 'token'],
		}
	}
};

const depositRoutes = async (fastify, options) => {

	// Authenticate deposit routes
	fastify.register(authentication);

	let walletAddress = null;

	// Set Wallet Address for common use
	fastify.addHook('preHandler', (request, reply, done) => {
		walletAddress = request.walletAddress ?? null;
	});

	// Deposit route
	fastify.post('/deposit', depositOptions, async (request, reply) => {

		const depositSuccess = await DepositController.deposit(walletAddress, request.body);

		if (depositSuccess) {
			return reply.code(201).send({status: 'success'});
		}

		return reply.code(500).send({
			error: 'Unable to deposit'
		});
	});

	// Get balances route
	fastify.get('/getBalances', async (request, reply) => {

		const deposits = await DepositController.list(walletAddress);

		return reply.code(200).send(deposits);
	});
};

export default depositRoutes;
