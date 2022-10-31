import { configureStore } from '@reduxjs/toolkit';
import IAlert from '../@interfaces/IAlert';
import IToastMessage from '../@interfaces/IToastMessage';
import alerts from './slices/alerts';
import counter, { ICounterSlice } from './slices/counter';
import toasts from './slices/toasts';
import user, { IUserSlice } from './slices/user';

export interface IStore {
  alerts: Array<IAlert>;
  counter: ICounterSlice;
  toasts: Array<IToastMessage>;
  user: IUserSlice;
}

const store = configureStore({
  reducer: { alerts, counter, toasts, user },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export default store;
