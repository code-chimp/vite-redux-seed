import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import IToastMessage from '../../@interfaces/IToastMessage';
import ToastTypes from '../../@enums/ToastTypes';
import { IStore } from '../';

const initialState: Array<IToastMessage> = [];

function createToastMessagePayload(toast: Partial<IToastMessage>): IToastMessage {
  return {
    ...toast,
    id: uuid(),
  };
}

export const toasts = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    removeToastMessage: (state: Array<IToastMessage>, action: PayloadAction<string>) => {
      const index = state.findIndex(t => t.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addErrorToastMessage: {
      reducer(state: Array<IToastMessage>, action: PayloadAction<IToastMessage>) {
        state.push(action.payload);
      },
      prepare(text: string): any {
        return { payload: createToastMessagePayload({ type: ToastTypes.Error, text }) };
      },
    },
    addInfoToastMessage: {
      reducer(state: Array<IToastMessage>, action: PayloadAction<IToastMessage>) {
        state.push(action.payload);
      },
      prepare(text: string): any {
        return { payload: createToastMessagePayload({ type: ToastTypes.Info, text }) };
      },
    },
    addSuccessToastMessage: {
      reducer(state: Array<IToastMessage>, action: PayloadAction<IToastMessage>) {
        state.push(action.payload);
      },
      prepare(text: string): any {
        return { payload: createToastMessagePayload({ type: ToastTypes.Success, text }) };
      },
    },
    addWarningToastMessage: {
      reducer(state: Array<IToastMessage>, action: PayloadAction<IToastMessage>) {
        state.push(action.payload);
      },
      prepare(text: string): any {
        return { payload: createToastMessagePayload({ type: ToastTypes.Warning, text }) };
      },
    },
  },
});

export const {
  addErrorToastMessage,
  addInfoToastMessage,
  addSuccessToastMessage,
  addWarningToastMessage,
  removeToastMessage,
} = toasts.actions;

export const selectToasts = (state: IStore) => state.toasts;

export default toasts.reducer;
