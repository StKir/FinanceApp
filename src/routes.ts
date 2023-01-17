// import Catalog from './pages/catalogPage/Catalog';
import { lazy } from 'react';

const Exchanger = lazy(() => import('./pages/exchangerPage/Exchanger'));
const Board = lazy(() => import('./pages/boardPage/Board'));
const Admin = lazy(() => import('./pages/adminPage/AdminPage'));
const News = lazy(() => import('./pages/newsPage/News'));
const Auth = lazy(() => import('./pages/authPage/Auth'));
const Main = lazy(() => import('./pages/Main/Main'));

interface route {
	path: string;
	Component: React.LazyExoticComponent<() => JSX.Element>;
}

type routeNav = {
	id: number;
	name: string;
	route: string;
	auth: boolean;
};

export const routeNames: routeNav[] = [
	{
		id: 3,
		name: 'Обменник',
		route: '/exchanger',
		auth: true
	},
	{
		id: 5,
		name: 'Админпанель',
		route: '/admin',
		auth: true
	},
	{
		id: 4,
		name: 'Доска',
		route: '/board',
		auth: true
	},
	{
		id: 1,
		name: 'Главная',
		route: '/',
		auth: false
	},
	{
		id: 2,
		name: 'Новости',
		route: '/news',
		auth: false
	}
];

export const authRoutes: route[] = [
	{
		path: '/exchanger',
		Component: Exchanger
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

export const publicRoutes: route[] = [
	{
		path: '/news',
		Component: News
	},
	{
		path: '/',
		Component: Main
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
