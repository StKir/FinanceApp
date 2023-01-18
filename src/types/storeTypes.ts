export interface authAdapterType {
	isAuth: boolean;
	modalOpen: boolean;
	_user: user;
	modalType: 'reg' | 'log';
}

export interface user {
	id: string | number;
	name?: string;
	email: string;
	remember?: boolean;
	password?: string;
}

export interface exchangeData {
	adapter: string;
	from: string;
	fromNetwork: string;
	to: string;
	toNetwork: string;
	offerReferenceId: string;
	amountFrom: number;
	amountTo: number | string;
	quotaId: string;
	offerExpirationTime: string;
	id?: string;
}

export interface Ttokens {
	value: string;
	label: string;
}
