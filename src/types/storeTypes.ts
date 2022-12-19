export interface authAdapterType {
	isAuth: boolean;
	_user: user;
}

export interface user {
	id: string | number;
	name: string;
	email: string;
}
