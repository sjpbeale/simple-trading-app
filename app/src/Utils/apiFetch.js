/**
 * Api Fetch Util
 */
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const callAPI = (uri, data = {}, method = 'GET') => {

	if (!uri) {
		throw new Error('API URI is empty');
	}

	const request = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};


	// Move Auth to Header for GET requests
	if (method === 'GET') {

		const { auth } = data;

		if (auth) {
			const authBuffer = Buffer.from(JSON.stringify(auth));
			request.headers.Authorization = authBuffer.toString('base64');
		}
	}

	// Inject data to body for POST requests
	if (method === 'POST') {
		request.body = JSON.stringify(data);
	}

	return fetch(`${apiUrl}/${uri}`, request).then((response) => response.json());
};

export const apiGet = (uri, data = {}) => {
	return callAPI(uri, data, 'GET');
};

export const apiPost = (uri, data = {}) => {
	return callAPI(uri, data, 'POST');
}
