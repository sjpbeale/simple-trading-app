import { test } from 'tap';
import build from '../src/api.js';

test('Checking root of routes', async t => {

	const api = build();

	const response = await api.inject({
		method: 'GET',
		url: '/',
	});

	t.equal(response.statusCode, 404, 'Returns expected 404 code')
});

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

	t.equal(response.statusCode, 401, 'Returns expected 401 not authorised');
});

test();
