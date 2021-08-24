/**
 * API Server
 */
import env from 'dotenv';
import api from './api.js';

env.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = api();

const start = async () => {

	try {
		await server.listen(PORT, HOST);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
