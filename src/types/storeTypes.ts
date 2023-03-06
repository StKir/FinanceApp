import { exhangeType } from './typesApp';

export interface authAdapterType {
	isAuth: boolean;
	modalOpen: boolean;
	_user: Tuser | null;
	modalType: 'reg' | 'log';
}

export interface loginUser {
	email: string;
	password: string;
	remember: boolean;
}

export interface registUser {
	email: string;
	name: string;
	password: string;
	remember: boolean;
	confirm: string;
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

export interface TvalidatorWallet {
	token: string;
	addres: string;
	input: 1 | 2;
}

export interface TvalidatorRes extends TvalidatorWallet {
	status: boolean;
}

export interface TtranRes {
	amountDeposit: string;
	createdAt: string;
	from: string;
	to: string;
	status: string;
	id: string;
}

export interface Tuser {
	email: string | null;
	login: string | null;
	token: string | null;
	id: number | string;
}

export type ExchangeAdaterType = {
	LoadingStatus: 'idle' | 'loading' | 'error';
	data: exhangeType;
	entities: {};
	ids: [];
	selectedChanger: exchangeData | null;
	exchangeMoadal: boolean;
	tokens: Ttokens[];
	validationWallets: {
		addres1: TvalidatorRes | null;
		addres2: TvalidatorRes | null;
	};
	transctionList: [];
};

export type TransactionAdapterType = {
	entities: {};
	ids: [];
	LoadingStatus: 'idle' | 'loading' | 'error' | 'start';
};

export interface TtransactionItem extends TtranRes {
	quotaId: string;
	fromNetwork: string;
	toNetwork: string;
	addressReceive: string;
	extraIdReceive: string;
	addressDeposit: string;
	extraIdDeposit: string;
	amountEstimated: string;
	payinHash: null | string;
	payoutHash: null | string;
	hashReceive: null | string;
	depositReceivedAt: null | string;
	payTill: null | string;
	fee: number;
	refundExtraId: string;
	refundAddress: string;
	userUnique: string;
	amountRealReceive: string;
	amountFromBtc: string;
}

export interface TerrorTranstaction {
	error: boolean;
	massage: string;
}
