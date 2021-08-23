/**
 * Authentication Context
 */
import { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

// Set web3 / provider
const web3 = new Web3(Web3.givenProvider);
const provider = web3.currentProvider;

// @note - better in env variable
const message = 'auth';

const authContext = createContext();

const AuthProvider = ({ children }) => {

	const [authorised, setAuthorised] = useState(false);
	const [credentials, setCredentials] = useState(() => {
		try {
			const stored = localStorage.getItem('credentials');
			return stored ? JSON.parse(stored) : {};
		} catch (err) {
			return {};
		}
	});
	const [connecting, setConnecting] = useState(false);

	// Validate credentials
	useEffect(() => {

		const { signature, address } = credentials;

		if (!signature || !address) {
			setAuthorised(false);
		} else {
			web3.eth.personal.ecRecover(message, signature).then((account) => {
				if (account === address) {
					setAuthorised(true);
				} else {
					setAuthorised(false);
				}
			}).catch((err) => {
				setAuthorised(false);
			});
		}

	}, [credentials]);

	// Account change
	useEffect(() => {

		provider.on('accountsChanged', accountChange);

		provider.request({ method: 'eth_accounts' }).then(accountChange).catch((err) => {
			console.log('blah', err);
		});

	}, []);

	const accountChange = (accounts) => {
		if (!accounts.length) {
			localStorage.removeItem('credentials');
			setCredentials({});
		} else {
			// 
		}
	};

	const connect = () => {

		setConnecting(true);

		provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {

			if (!accounts.length) {
				// Need to connect to MetaMask
			} else {
				web3.eth.personal.sign(message, accounts[0]).then((sig) => {

					const newCredentials = {
						signature: sig,
						address: accounts[0],
					};

					localStorage.setItem('credentials', JSON.stringify(newCredentials));

					setCredentials(newCredentials);

				}).catch((err) => {
					// Handle signing error
				});
			}

		}).catch((err) => {
			if (err.code === 4001) {
				// User rejected
			} else {
				// Unknown error
			}
		});
	};

	const authValue = {
		authorised,
		credentials,
		connect,
		connecting,
	};

	return (
		<authContext.Provider value={authValue} >
			{ children }
		</authContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(authContext);
	if (context === undefined) {
		throw new Error('useAuth must be used with AuthProvider');
	}
	return context;
};

export {
	AuthProvider,
	useAuth,
};
