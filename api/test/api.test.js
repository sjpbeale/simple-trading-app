import { test } from 'tap';
import build from '../src/api.js';

// Confirm 404 on root of api
test('Checking root of routes', async t => {

	const api = build();

	const response = await api.inject({
		method: 'GET',
		url: '/',
	});

	t.equal(response.statusCode, 404, 'returns expected 404 code')
});

// Confirm 400 on missing data
test('Checking auth only uri', async t => {

	const api = build();

	const response = await api.inject({
		method: 'POST',
		url: '/deposit',
		payload: {
			amount: 20,
		}
	});

	t.equal(response.statusCode, 400, 'returns expected 400 bad request');
});

// Confirm 401 on protected uri
test('Checking auth only uri', async t => {

	const api = build();

	const response = await api.inject({
		method: 'POST',
		url: '/deposit',
		payload: {
			amount: 20,
			token: 'ETH',
		}
	});

	t.equal(response.statusCode, 401, 'returns expected 401 not authorised');
});
