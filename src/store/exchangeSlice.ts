import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { exchangeData } from '../types/storeTypes';
import { exhangeType } from '../types/typesApp';
import { RootState } from './store';
const ExchangeAdater = createEntityAdapter<exchangeData>();

type ExchangeAdaterType = {
	LoadingStatus: 'idle' | 'loading' | 'error';
	data: exhangeType;
	entities: {};
	ids: [];
};

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'idle',
	data: {}
} as ExchangeAdaterType;

export const fetchExhangeData = createAsyncThunk<exchangeData[], exhangeType>(
	'exchange/fetchExhangeData',
	async ({ amount, send, receive }) => {
		return await axios({
			method: 'GET',
			headers: {
				'x-api-key': 'wqDOuFGv1'
			},
			url: `https://api.swapzone.io/v1/exchange/get-rate?from=${send}&to=${receive}&amount=${amount}&rateType=all&availableInUSA=false&chooseRate=all&noRefundAddress=false`
		})
			.then((data) =>
				data.data.map((el: exchangeData) => {
					el.id = el.quotaId;
					return el;
				})
			)
			.catch((err) => console.log(err));
	}
);

const exhangeSlice = createSlice({
	name: 'exchange',
	initialState,
	reducers: {
		changeData: (state, { payload }: PayloadAction<exhangeType>) => {
			state.data = payload;
		},
		refreshData: (state) => {
			state.data = { amount: 0, receive: '', send: '' };
			ExchangeAdater.removeAll(state);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExhangeData.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(fetchExhangeData.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'idle';
				console.log(payload);
				ExchangeAdater.setAll(state, payload);
			})
			.addCase(fetchExhangeData.rejected, (state) => {
				state.LoadingStatus = 'error';
			});
	}
});

const { reducer, actions } = exhangeSlice;

export const { selectAll } = ExchangeAdater.getSelectors<RootState>(
	(state) => state.exchange
);

export default reducer;

export const { changeData, refreshData } = actions;
