import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useAppSelector } from '../store/store';
import { checkAuth } from '../store/authSlice';
const Error404 = lazy(() => import('../pages/404/Error404'));
const Board = lazy(() => import('../pages/boardPage/Board'));

function AppRouter() {
	const isAuth = useAppSelector(checkAuth);
	return (
		<Suspense>
			<Routes>
				{isAuth &&
					authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path='/*' element={<Error404 />} />
			</Routes>
		</Suspense>
	);
}

export default AppRouter;
