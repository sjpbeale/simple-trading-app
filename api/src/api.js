/**
 * API Build
 */
import fastify from 'fastify';
import cors from 'fastify-cors';

import depositRoutes from '#Routes/deposit';
import ordersRoutes from '#Routes/orders';

const build = (opts = {}) => {

	const api = fastify(opts);

	// Cors for all requests
	api.register(cors);

	// Init api routes
	api.register(depositRoutes);
	api.register(ordersRoutes);

	return api
};

export default build;
