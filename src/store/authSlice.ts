import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { authAdapterType, user } from '../types/storeTypes';
import { RootState } from './store';

const authAdapter = createEntityAdapter<authAdapterType>();

const initialState = {
	isAuth: true,
	_user: {},
	modalOpen: false
} as authAdapterType;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeAuth: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuth = payload;
		},
		getUser: (state, { payload }: PayloadAction<any>) => {
			state._user = payload;
		},
		openModal: (state, { payload }: PayloadAction<boolean>) => {
			state.modalOpen = payload;
		},
		login: (state, { payload }: PayloadAction<user>) => {
			//заглушка
			state._user = payload;
			state.isAuth = true;
			state.modalOpen = false;
		}
	}
});

const { reducer, actions } = authSlice;

export const checkAuth = (state: RootState) => state.auth.isAuth;

export default reducer;

export const { changeAuth, getUser, openModal, login } = actions;
