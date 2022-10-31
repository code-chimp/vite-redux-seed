import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import AlertTypes from '../../@enums/AlertTypes';
import AlertType from '../../@types/AlertType';
import IAlert from '../../@interfaces/IAlert';
import { IStore } from '../';

const initialState: Array<IAlert> = [];

const createAlertPayload = (type: AlertType, alert: Partial<IAlert>): IAlert => {
  return {
    ...alert,
    id: uuid(),
    type,
  };
};

export const alerts = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    removeAlert: (state: Array<IAlert>, action: PayloadAction<string>) => {
      const index = state.findIndex(a => a.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addErrorAlert: {
      reducer(state: Array<IAlert>, action: PayloadAction<IAlert>) {
        state.push(action.payload);
      },
      prepare(alert: Partial<IAlert>): any {
        return { payload: createAlertPayload(AlertTypes.Error, alert) };
      },
    },
    addInfoAlert: {
      reducer(state: Array<IAlert>, action: PayloadAction<IAlert>) {
        state.push(action.payload);
      },
      prepare(alert: Partial<IAlert>): any {
        return { payload: createAlertPayload(AlertTypes.Info, alert) };
      },
    },
    addSuccessAlert: {
      reducer(state: Array<IAlert>, action: PayloadAction<IAlert>) {
        state.push(action.payload);
      },
      prepare(alert: Partial<IAlert>): any {
        return { payload: createAlertPayload(AlertTypes.Success, alert) };
      },
    },
    addWarningAlert: {
      reducer(state: Array<IAlert>, action: PayloadAction<IAlert>) {
        state.push(action.payload);
      },
      prepare(alert: Partial<IAlert>): any {
        return { payload: createAlertPayload(AlertTypes.Warning, alert) };
      },
    },
  },
});

export const { addErrorAlert, addInfoAlert, addSuccessAlert, addWarningAlert, removeAlert } =
  alerts.actions;

export const selectAlerts = (state: IStore) => state.alerts;

export default alerts.reducer;
