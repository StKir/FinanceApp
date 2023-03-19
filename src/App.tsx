import './App.css';
import AppMenu from './components/appMenu/AppMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRoutes';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';

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
					<PersistGate loading={null} persistor={persistor}>
						<Router>
							<AppMenu />
							<AppRouter />
						</Router>
					</PersistGate>
				</Provider>
			</ConfigProvider>
		</div>
	);
}

export default App;
