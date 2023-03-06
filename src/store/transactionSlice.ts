import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { getStatus } from '../hooks/useTransaction';
import {
	exchangeData,
	TerrorTranstaction,
	TransactionAdapterType,
	TtranRes,
	TtransactionItem
} from '../types/storeTypes';
import { Ttransactoin } from '../types/typesApp';
import { RootState } from './store';

const TransactionAdater = createEntityAdapter<TtranRes>();

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'start'
} as TransactionAdapterType;

export const addTransaction = createAsyncThunk<
	TtransactionItem | TerrorTranstaction,
	Ttransactoin & exchangeData
>(
	'transaction/addTransaction',
	async ({ from, to, amountFrom, quotaId, vallet1, vallet2 }) => {
		return await axios({
			method: 'POST',
			headers: {
				'x-api-key': process.env.REACT_APP_PRIVATE_KEY!
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
			.then((data) => data.data)
			.catch((err) => console.log(err));
	}
);

export const updateTransaction = createAsyncThunk(
	'transaction/updateTransaction',
	async (transactionID: string) => {
		const response = await getStatus(
			transactionID,
			process.env.REACT_APP_PRIVATE_KEY!
		);
		return response;
	}
);

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		resetStatus: (state) => {
			state.LoadingStatus = 'start';
		},
		testStatus: (state, { payload }: PayloadAction<string>) => {
			const changes = { status: 'success' };
			const id = payload;
			TransactionAdater.updateOne(state, { id, changes });
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTransaction.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(addTransaction.fulfilled, (state, { payload }) => {
				if ('id' in payload) {
					TransactionAdater.addOne(state, payload);
					state.LoadingStatus = 'idle';
				}
				if ('error' in payload) {
					state.LoadingStatus = 'error';
				}
			})
			.addCase(addTransaction.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(updateTransaction.fulfilled, (state, { payload }) => {
				const { id, ...changes } = payload;
				console.log('update');
				TransactionAdater.updateOne(state, { id, changes });
			});
	}
});

const { reducer, actions } = transactionSlice;

export const { selectAll } = TransactionAdater.getSelectors<RootState>(
	(state) => state.transaction
);

export const { resetStatus, testStatus } = actions;

export default reducer;
