export interface exhangeType {
	amount: number;
	receive: string;
	send: string;
}

export interface exhangeTokens {
	name: string;
	ticker: string;
	network: string;
	smartContract: string;
}

export interface TvalidateAddress {
	wallet: string;
	token: string;
}

export interface Ttransactoin {
	vallet1: string;
	vallet2: string;
	accept: boolean;
}

export interface Telement {
	fromNetwork: string;
	toNetwork: string;
	status: string;
	id: string;
	amountDeposit: string;
	amountEstimated: string;
	createdAt: string;
	addressDeposit: string;
}
