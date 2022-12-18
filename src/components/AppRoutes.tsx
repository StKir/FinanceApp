import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Navigate } from 'react-router-dom';
const Board = lazy(() => import('../pages/boardPage/Board'));
// import { useAppSelector } from '../store/store';
// import { checkAuth } from '../store/authSlice';

function AppRouter() {
	const isAuth = false;
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
				<Route
					path='/'
					element={!isAuth ? <Navigate to='/news' /> : <Board />}
				/>
				<Route path='/*' element={<Board />} />
			</Routes>
		</Suspense>
	);
}

export default AppRouter;
