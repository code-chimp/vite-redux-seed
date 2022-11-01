import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import IToastMessage from '../../../@interfaces/IToastMessage';
import ToastTypes from '../../../@enums/ToastTypes';
import AppToasts from './AppToasts';

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState: Array<IToastMessage> = [
  {
    id: 'foo',
    text: 'batten down the hatches',
    type: ToastTypes.Warning,
  },
];

describe('components / app / AppToasts', () => {
  it('should match the snapshot', () => {
    store = mockStore({ toasts: initialState });
    const { asFragment } = render(
      <Provider store={store}>
        <AppToasts />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
