import { createSlice } from '@reduxjs/toolkit';
import { IStore } from '../';

export interface ICounterSlice {
  value: number;
}

export const counter = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state: ICounterSlice) => {
      state.value += 1;
    },
    decrement: (state: ICounterSlice) => {
      state.value -= 1;
    },
    incrementByAmount: (state: ICounterSlice, action: { type: string; payload: number }) => {
      state.value += action.payload;
    },
  },
});

/* Ignore selectors in test coverage report due to simplicity */
/* istanbul ignore next */
export const selectCount = (state: IStore) => state.counter.value;

export const { increment, decrement, incrementByAmount } = counter.actions;

export default counter.reducer;
