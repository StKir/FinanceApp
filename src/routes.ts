// import Catalog from './pages/catalogPage/Catalog';
import { lazy } from 'react';

const Catalog = lazy(() => import('./pages/catalogPage/Catalog'));
const Board = lazy(() => import('./pages/boardPage/Board'));
const Admin = lazy(() => import('./pages/adminPage/AdminPage'));
const News = lazy(() => import('./pages/newsPage/News'));
const Auth = lazy(() => import('./pages/authPage/Auth'));

interface route {
	path: string;
	Component: React.LazyExoticComponent<() => JSX.Element>;
}

export const authRoutes: route[] = [
	{
		path: '/catalog',
		Component: Catalog
	},
	{
		path: '/board',
		Component: Board
	},
	{
		path: '/admin',
		Component: Admin
	}
];

export const publicRoutes = [
	{
		path: '/news',
		Component: News
	},
	{
		path: '/login',
		Component: Auth
	},
	{
		path: '/register',
		Component: Auth
	}
];
