/**
 * Simple Trading server
 */
import fastify from 'fastify';
import cors from 'fastify-cors';
import env from 'dotenv';

import authentication from '#Hooks/authentication';
import depositRoutes from '#Routes/deposit';
import ordersRoutes from '#Routes/orders';

env.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = fastify({
	logger: {
		prettyPrint: true,
	}
});

// Cors for all requests
server.register(cors);

// Auth for all requests
server.register(authentication);

// Init api routes
server.register(depositRoutes);
server.register(ordersRoutes);

const start = async () => {

	try {
		await server.listen(PORT, HOST);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
