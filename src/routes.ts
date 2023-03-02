// import Catalog from './pages/catalogPage/Catalog';
import { lazy } from 'react';

const Exchanger = lazy(() => import('./pages/exchangerPage/Exchanger'));
const Board = lazy(() => import('./pages/boardPage/Board'));
const Main = lazy(() => import('./pages/Main/Main'));

interface route {
	path: string;
	Component: React.LazyExoticComponent<() => JSX.Element>;
}

type routeNav = {
	id: number;
	name: string;
	route: string;
};

export const routeNames: routeNav[] = [
	{
		id: 3,
		name: 'Обменник',
		route: '/exchanger'
	},
	{
		id: 4,
		name: 'Доска',
		route: '/board'
	},
	{
		id: 1,
		name: 'Главная',
		route: '/'
	}
];

export const publicRoutes: route[] = [
	{
		path: '/',
		Component: Main
	},
	{
		path: '/exchanger',
		Component: Exchanger
	},
	{
		path: '/board',
		Component: Board
	}
];
