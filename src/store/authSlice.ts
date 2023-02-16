import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAdapterType, Tuser } from '../types/storeTypes';
import { RootState } from './store';

const initialState = {
	isAuth: false,
	_user: {},
	modalOpen: false,
	modalType: 'log'
} as authAdapterType;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeAuth: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuth = payload;
			state._user = null;
		},
		getUser: (state, { payload }: PayloadAction<any>) => {
			state._user = payload;
		},
		openModal: (state, { payload }: PayloadAction<boolean>) => {
			state.modalOpen = payload;
		},
		login: (state, { payload }: PayloadAction<Tuser>) => {
			state._user = payload;
			state.isAuth = true;
			state.modalOpen = false;
			state.modalType = 'log';
		},
		changeTypeModal: (state, { payload }: PayloadAction<'log' | 'reg'>) => {
			state.modalType = payload;
		}
	}
});

const { reducer, actions } = authSlice;

export const checkAuth = (state: RootState) => state.auth.isAuth;

export default reducer;

export const { changeAuth, getUser, openModal, login, changeTypeModal } =
	actions;
