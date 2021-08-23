import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

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
		<>
		<GlobalStyle />
		<Router>
			<Route exact path="/connect">
				<div>Connect</div>
			</Route>
		</Router>
		</>
	);
}

export default App;
