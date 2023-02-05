import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
	exchangeData,
	Ttokens,
	TtranRes,
	TvalidatorRes,
	TvalidatorWallet
} from '../types/storeTypes';
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
	validationWallets: {
		addres1: TvalidatorRes | null;
		addres2: TvalidatorRes | null;
	};
	transctionList: [];
};

const initialState = {
	entities: {},
	ids: [],
	LoadingStatus: 'idle',
	data: {},
	selectedChanger: {},
	validationWallets: {
		addres1: {},
		addres2: {}
	},
	exchangeMoadal: false,
	tokens: [
		{
			value: 'Загрузка!',
			label: 'Загрузка!'
		}
	],
	transctionList: []
} as ExchangeAdaterType;

export const fetchExhangeData = createAsyncThunk<exchangeData[], exhangeType>(
	'exchange/fetchExhangeData',
	async ({ amount, send, receive }) => {
		return await axios({
			method: 'GET',
			headers: {
				'x-api-key': process.env.REACT_APP_PRIVATE_KEY!
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
				'x-api-key': process.env.REACT_APP_PRIVATE_KEY!
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

export const validateWallet = createAsyncThunk<TvalidatorRes, TvalidatorWallet>(
	'exchange/validateWallet',
	async ({ token, addres, input }) => {
		return await axios({
			method: 'GET',
			headers: {
				'x-api-key': process.env.REACT_APP_PRIVATE_KEY!
			},
			url: `https://api.swapzone.io/v1/exchange/validate/address?currency=${token}&address=${addres}`
		}).then((data) => ({
			status: data.data.result,
			token,
			addres,
			input
		}));
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
			state.validationWallets.addres1 = null;
			state.validationWallets.addres2 = null;
		},
		selectChanger: (state, { payload }: PayloadAction<exchangeData>) => {
			state.selectedChanger = payload;
			state.exchangeMoadal = true;
		},
		cancellationExchange: (state) => {
			state.selectedChanger = null;
			state.exchangeMoadal = false;
		},
		resetValidator: (state) => {
			state.validationWallets.addres1 = null;
			state.validationWallets.addres2 = null;
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
			})
			.addCase(validateWallet.fulfilled, (state, { payload }) => {
				if (payload.input === 1) {
					state.validationWallets.addres1 = payload;
				} else {
					state.validationWallets.addres2 = payload;
				}
			});
	}
});

const { reducer, actions } = exhangeSlice;

export const { selectAll } = ExchangeAdater.getSelectors<RootState>(
	(state) => state.exchange
);

export default reducer;

export const {
	changeData,
	refreshData,
	selectChanger,
	cancellationExchange,
	resetValidator
} = actions;
