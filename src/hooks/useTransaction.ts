import axios from 'axios';
// import { addTransaction } from '../store/exchangeSlice';
import { exchangeData } from '../types/storeTypes';
import { Ttransactoin } from '../types/typesApp';

export const useTransaction = (
	trans: Ttransactoin & exchangeData,
	key: string,
	dispatch: any
) => {
	const { from, to, amountFrom, quotaId, vallet1, vallet2 } = trans;
	axios({
		method: 'POST',
		headers: {
			'x-api-key': key
		},
		url: 'https://api.swapzone.io/v1/exchange/create',
		data: {
			to,
			from,
			addressReceive: vallet2,
			amountDeposit: amountFrom,
			refundAddress: vallet1,
			quotaId
		}
	})
		.then((data) => data.data.transaction)
		// .then((data) =>
		// 	dispatch(
		// 		addTransaction({
		// 			amountDeposit: data.amountDeposit,
		// 			from: data.from,
		// 			to: data.to,
		// 			createdAt: data.createdAt,
		// 			status: data.status,
		// 			id: data.id
		// 		})
		// 	)
		// )
		.catch((e) => console.log(e));
};
export const getStatus = (id: string, key: string) => {
	axios({
		method: 'GET',
		headers: {
			'x-api-key': key
		},
		url: `https://api.swapzone.io/v1/exchange/tx?id=${id}`
	}).then((data) => console.log(data.data));
};
