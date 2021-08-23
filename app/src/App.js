import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ProtectedRoute from 'Utils/ProtectedRoute';

import Connect from 'Screens/Connect';
import Trading from 'Screens/Trading';

const customTheme = {
	flexa: {
		gutter: {
			xs: '8px',
			sm: '8px',
			md: '8px',
			lg: '10px',
		}
	}
};

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}
	body {
		font-family: Lato,"sans-serif";
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: rgb(10, 16, 23);
		color: white;
	}
	#root {
		margin: 8px;
		display: flex;
		flex-direction: column;
	}
`;

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<GlobalStyle />
			<Router>
				<Route exact path="/connect">
					<Connect />
				</Route>
				<ProtectedRoute exact path="/trading">
					<Trading />
				</ProtectedRoute>
				<Route path="/" exact component={() => {
					return <Redirect to="/trading" />
				}}/>
			</Router>
		</ThemeProvider>
	);
}

export default App;
