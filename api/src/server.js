/**
 * Simple Trading server
 */
import fastify from 'fastify';
import cors from 'fastify-cors';
import env from 'dotenv';

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

const start = async () => {

	try {
		await server.listen(PORT, HOST);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
