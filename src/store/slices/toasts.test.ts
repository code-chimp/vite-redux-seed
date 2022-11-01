import { Mock } from 'vitest';
import { toasts } from './toasts';
import ToastTypes from '../../@enums/ToastTypes';
import IToastMessage from '../../@interfaces/IToastMessage';

import { v4 } from 'uuid';
vi.mock('uuid');

describe('store / slices / toasts', () => {
  describe('reducer(s)', () => {
    const initialState: Array<IToastMessage> = [
      { id: 'foo', type: ToastTypes.Success, text: 'am getting' },
      { id: 'bar', type: ToastTypes.Info, text: 'haz cheezeburger' },
      { id: 'baz', type: ToastTypes.Warning, text: 'no moar catnip' },
    ];
    const mockedUuid = v4 as Mock<any, any>;
    const mockUuidValue = 'are-we-having-the-fun-yet';

    it('should remove a toast by id', () => {
      const { removeToastMessage } = toasts.actions;
      const toastId = 'foo';
      const expected: Array<IToastMessage> = initialState.filter(t => t.id !== toastId);

      const state = toasts.reducer(initialState, removeToastMessage(toastId));

      expect(state.some(_ => _.id === toastId)).toBe(false);
      expect(state).toEqual(expected);
    });

    it('should add an error toast message with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addErrorToastMessage } = toasts.actions;

      const text = 'yeah, bad things happened';
      const expected: Array<IToastMessage> = [
        ...initialState,
        { type: ToastTypes.Error, text, id: mockUuidValue },
      ];

      const state = toasts.reducer(initialState, addErrorToastMessage(text));

      expect(state).toEqual(expected);
    });

    it('should add an informational toast message with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addInfoToastMessage } = toasts.actions;

      const text = 'we did the amazing';
      const expected: Array<IToastMessage> = [
        ...initialState,
        { type: ToastTypes.Info, text, id: mockUuidValue },
      ];

      const state = toasts.reducer(initialState, addInfoToastMessage(text));

      expect(state).toEqual(expected);
    });

    it('should add a success toast message with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addSuccessToastMessage } = toasts.actions;

      const text = 'who is awesome? you is awesome!';
      const expected: Array<IToastMessage> = [
        ...initialState,
        { type: ToastTypes.Success, text, id: mockUuidValue },
      ];

      const state = toasts.reducer(initialState, addSuccessToastMessage(text));

      expect(state).toEqual(expected);
    });

    it('should add a warning toast message with a generated uuid', () => {
      mockedUuid.mockImplementationOnce(() => mockUuidValue);
      const { addWarningToastMessage } = toasts.actions;

      const text = 'these pants are flammable';
      const expected: Array<IToastMessage> = [
        ...initialState,
        { type: ToastTypes.Warning, text, id: mockUuidValue },
      ];

      const state = toasts.reducer(initialState, addWarningToastMessage(text));

      expect(state).toEqual(expected);
    });
  });
});
