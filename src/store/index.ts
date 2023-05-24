import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import jsonApi from './services/json';
import swApi from './services/sw';
import alerts from './slices/alerts';
import counter from './slices/counter';
import toasts from './slices/toasts';

const store = configureStore({
  reducer: {
    alerts,
    counter,
    toasts,
    [jsonApi.reducerPath]: jsonApi.reducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(jsonApi.middleware).concat(swApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
