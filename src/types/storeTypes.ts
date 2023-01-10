export interface authAdapterType {
	isAuth: boolean;
	modalOpen: boolean;
	_user: user;
}

export interface user {
	id: string | number;
	name?: string;
	email: string;
	remember?: boolean;
	password?: string;
}
