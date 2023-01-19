import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { exchangeData, Ttokens } from '../types/storeTypes';
import { exhangeTokens, exhangeType } from '../types/typesApp';
import { RootState } from './store';
const ExchangeAdater = createEntityAdapter<exchangeData>();

type ExchangeAdaterType = {
	LoadingStatus: 'idle' | 'loading' | 'error';
	data: exhangeType;
	entities: {};
	ids: [];
	selectedChanger: exchangeData | null;
	exchangeMoadal: boolean;
	tokens: Ttokens[];
};

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'idle',
	data: {},
	selectedChanger: {},
	exchangeMoadal: false,
	tokens: [
		{
			value: 'Загрузка!',
			label: 'Загрузка!'
		}
	]
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

export const getAllTokens = createAsyncThunk<Ttokens[]>(
	'exchange/getAllTokens',
	async () => {
		return await axios({
			method: 'GET',
			headers: {
				'x-api-key': 'wqDOuFGv1'
			},
			url: 'https://api.swapzone.io/v1/exchange/currencies'
		}).then((data) =>
			data.data.map((el: exhangeTokens) => ({
				value: el.ticker,
				label: el.ticker.toUpperCase() + ' ' + el.name
			}))
		);
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
			state.selectedChanger = null;
		},
		selectChanger: (state, { payload }: PayloadAction<exchangeData>) => {
			state.selectedChanger = payload;
			state.exchangeMoadal = true;
		},
		cancellationExchange: (state) => {
			state.selectedChanger = null;
			state.exchangeMoadal = false;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExhangeData.pending, (state) => {
				state.LoadingStatus = 'loading';
			})
			.addCase(fetchExhangeData.fulfilled, (state, { payload }) => {
				state.LoadingStatus = 'idle';
				ExchangeAdater.setAll(state, payload);
			})
			.addCase(fetchExhangeData.rejected, (state) => {
				state.LoadingStatus = 'error';
			})
			.addCase(getAllTokens.fulfilled, (state, { payload }) => {
				state.tokens = payload;
			});
	}
});

const { reducer, actions } = exhangeSlice;

export const { selectAll } = ExchangeAdater.getSelectors<RootState>(
	(state) => state.exchange
);

export default reducer;

export const { changeData, refreshData, selectChanger, cancellationExchange } =
	actions;
