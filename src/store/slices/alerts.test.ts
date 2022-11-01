import { Mock } from 'vitest';
import { alerts } from './alerts';
import AlertTypes from '../../@enums/AlertTypes';
import IAlert from '../../@interfaces/IAlert';

import { v4 } from 'uuid';
vi.mock('uuid');

describe('store / slices / alerts', () => {
  describe('reducer(s)', () => {
    const initialState: Array<IAlert> = [
      { id: 'foo', type: AlertTypes.Error, text: 'i broke it' },
      { id: 'bar', type: AlertTypes.Info, text: 'it was brokded when I got here' },
      {
        id: 'baz',
        type: AlertTypes.Warning,
        text: "keep your fingers away from Lenny's mouth",
      },
    ];
    const mockedUuid = v4 as Mock<any, any>;
    const mockUuidValue = 'some-unique-guidy-thing';

    it('should remove an alert by id', () => {
      const { removeAlert } = alerts.actions;
      const alertId = 'bar';
      const expected: Array<IAlert> = initialState.filter(a => a.id !== alertId);

      const state = alerts.reducer(initialState, removeAlert(alertId));

      expect(state.some(_ => _.id === alertId)).toBe(false);
      expect(state).toEqual(expected);
    });

    it('should add an error alert with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addErrorAlert } = alerts.actions;

      const payload: IAlert = {
        id: 'i-am-not-a-real-fizzgig',
        type: AlertTypes.Error,
        text: 'yeah, bad things happened',
      };
      const expected: Array<IAlert> = [...initialState, { ...payload, id: mockUuidValue }];

      const state = alerts.reducer(initialState, addErrorAlert(payload));

      expect(state).toEqual(expected);
    });

    it('should add an informational alert with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addInfoAlert } = alerts.actions;

      const payload: IAlert = {
        id: 'hold-down-the-fort-martha',
        type: AlertTypes.Info,
        title: 'hay i haz titul',
        text: 'new info alert',
      };
      const expected: Array<IAlert> = [...initialState, { ...payload, id: mockUuidValue }];

      const state = alerts.reducer(initialState, addInfoAlert(payload));

      expect(state).toEqual(expected);
    });

    it('should add a success alert with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addSuccessAlert } = alerts.actions;

      const payload: IAlert = {
        id: 'i-got-nothing',
        type: AlertTypes.Success,
        text: 'new #winning alert',
      };
      const expected: Array<IAlert> = [...initialState, { ...payload, id: mockUuidValue }];

      const state = alerts.reducer(initialState, addSuccessAlert(payload));

      expect(state).toEqual(expected);
    });

    it('should add a warning alert with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addWarningAlert } = alerts.actions;

      const payload: IAlert = {
        id: 'really-why-do-you-read-these',
        type: AlertTypes.Warning,
        text: 'do not put that in your eye',
      };
      const expected: Array<IAlert> = [...initialState, { ...payload, id: mockUuidValue }];

      const state = alerts.reducer(initialState, addWarningAlert(payload));

      expect(state).toEqual(expected);
    });
  });
});
