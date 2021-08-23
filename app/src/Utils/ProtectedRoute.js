/**
 * Protected Route
 *
 * Kicks user to connect screen if not authorised.
 */
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'Auth/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {

	const auth = useAuth();

	return (
		<Route {...rest} render={({ location }) => auth.authorised ? (
			children
		) : (
			<Redirect to={{
				pathname: "/connect",
				state: { from: location },
			}} />
		)} />
	);
};

export default ProtectedRoute;
