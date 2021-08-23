/**
 * Orders Routes
 */
import OrdersController from '#Controllers/OrdersController';

// Place Order Options
const placeOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				side: { type: 'string' },
				amount: { type: 'integer' },
				price: { type: 'integer' },
				token: { type: 'string' },
			},
			required: ['side', 'amount', 'price', 'token'],
		}
	}
};

// Cancel Order Options
const cancelOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				id: { type: 'string' },
			},
			required: ['id'],
		}
	}
};

const ordersRoutes = async (fastify, options) => {

	let walletAddress = null;

	// Set Wallet Address for common use
	fastify.addHook('preHandler', (request, reply, done) => {
		walletAddress = request.walletAddress ?? null;
	});

	// Place order route
	fastify.post('/placeOrder', placeOptions, async (request, reply) => {

		try {
			const orderId = await OrdersController.place(walletAddress, request.body);

			if (!orderId) {
				throw new Error('Unable to place order');
			}

			return reply.code(201).send({
				orderId
			});

		} catch (err) {
			return reply.code(400).send(err);
		}
	});

	// Cancel order route
	fastify.post('/cancelOrder', cancelOptions, async (request, reply) => {

		const cancelSuccess = await OrdersController.cancel(walletAddress, request.body.id);

		if (cancelSuccess) {
			return reply.code(201).send({status: 'success'});
		}

		return reply.code(500).send({
			error: 'Unable to cancel order',
		});
	});

	// Get orders route
	fastify.get('/getOrders', async (request, reply) => {

		const orders = await OrdersController.list(walletAddress);

		return reply.code(200).send(orders);
	});
};

export default ordersRoutes;
