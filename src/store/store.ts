import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authSlice';
import exhangeReducer from './exchangeSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		exchange: exhangeReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
});
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
