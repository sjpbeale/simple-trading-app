/**
 * Authentication Plugin
 */
import fp from 'fastify-plugin';
import auth from 'fastify-auth';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

/**
 * Address from Signature
 *
 * Recovers address from signature and signed
 * message.
 *
 * @param {string} signature Signature to use.
 * @return {string} address
 */
const addressFromSignature = (signature) => {

	const msgBufferHex = bufferToHex(Buffer.from('auth', 'utf8'));

	return recoverPersonalSignature({
		data: msgBufferHex,
		sig: signature,
	});
};

const authentication = async (fastify, opts, next) => {

	await fastify.register(auth);

	// Check Signature from Auth Data in Body
	fastify.decorate('authBody', async (request, reply, done) => {

		if (!request.body || !request.body.auth) {
			throw new Error('Missing Auth Data');
		}

		const { signature, address } = request.body.auth;

		if (!signature || !address) {
			throw new Error('Missing Auth');
		}

		if (address !== addressFromSignature(signature)) {
			throw new Error('Invalid Auth');
		}

		// Inject auth
		request.walletAddress = address;

		// Remove auth data
		delete request.body.auth;

		done();
	});

	fastify.addHook('preHandler', fastify.auth([
		fastify.authBody,
	]));

	next();
};

export default fp(authentication);
