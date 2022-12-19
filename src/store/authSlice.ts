import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { authAdapterType } from '../types/storeTypes';
import { RootState } from './store';

const authAdapter = createEntityAdapter<authAdapterType>();

const initialState = {
	isAuth: true,
	_user: {}
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
		}
	}
});

const { reducer, actions } = authSlice;

export const checkAuth = (state: RootState) => state.auth.isAuth;

export default reducer;

export const { changeAuth, getUser } = actions;
