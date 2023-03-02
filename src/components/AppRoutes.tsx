import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../routes';
const Error404 = lazy(() => import('../pages/404/Error404'));

function AppRouter() {
	return (
		<Suspense>
			<Routes>
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path='/*' element={<Error404 />} />
			</Routes>
		</Suspense>
	);
}

export default AppRouter;
