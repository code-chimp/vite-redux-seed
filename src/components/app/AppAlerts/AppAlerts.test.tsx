import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import IAlert from '../../../@interfaces/IAlert';
import AlertTypes from '../../../@enums/AlertTypes';
import AppAlerts from './AppAlerts';

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState: Array<IAlert> = [
  {
    id: 'foo',
    text: 'batten down the hatches',
    type: AlertTypes.Warning,
  },
];

describe('components / app / AppAlerts', () => {
  it('should match the snapshot', () => {
    store = mockStore({ alerts: initialState });
    const { asFragment } = render(
      <Provider store={store}>
        <AppAlerts />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
