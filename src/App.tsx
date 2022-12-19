import React from 'react';
import './App.css';
import AppMenu from './components/appMenu/AppMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRoutes';
import store from './store/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

function App() {
	return (
		<div className='App'>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#29B22E'
					}
				}}
			>
				<Provider store={store}>
					<Router>
						<AppMenu />
						<AppRouter />
					</Router>
				</Provider>
			</ConfigProvider>
		</div>
	);
}

export default App;
