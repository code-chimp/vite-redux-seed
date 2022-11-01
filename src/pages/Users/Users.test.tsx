import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore, { MockStore } from 'redux-mock-store';
import Users from './Users';
import AsyncStates from '../../@enums/AsyncStates';
import { initialState, loadUsers } from '../../store/slices/user';

const mockStore = configureMockStore([thunk]);
let store: MockStore;

describe('components / Users', () => {
  it('should match the snapshot', () => {
    store = mockStore({
      user: { ...initialState },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a loading message in the default state and dispatch the load action', () => {
    store = mockStore({
      user: { ...initialState },
    });

    render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    const loading = screen.getByTestId('loading-indicator');
    expect(loading).toBeInTheDocument();

    const actionsDispatched = store.getActions().map(action => action.type);
    expect(actionsDispatched).toEqual([loadUsers.pending.type]);
  });

  it('should render a loading message in the pending state and not dispatch the load action', () => {
    store = mockStore({
      user: { ...initialState, status: AsyncStates.Pending },
    });

    render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    const loading = screen.getByTestId('loading-indicator');
    expect(loading).toBeInTheDocument();

    // does not satisfy the condition inside of the `useEffect`
    expect(store.getActions()).toEqual([]);
  });

  it('should render an error in the failed state', () => {
    store = mockStore({
      user: {
        ...initialState,
        status: AsyncStates.Fail,
        error: 'shabubu',
      },
    });

    render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    const error = screen.getByTestId('error-indicator');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe('Error: shabubu');

    // should not have satisfied the condition inside of the `useEffect`
    expect(store.getActions()).toEqual([]);
  });

  it('should render users upon success', () => {
    store = mockStore({
      user: {
        ...initialState,
        users: [
          {
            id: 1,
            name: 'A User',
            address: { city: 'Test', zipcode: 'test' },
            company: { name: 'kiewit' },
          },
          {
            id: 2,
            name: 'B User',
            address: { city: 'Test', zipcode: 'test' },
            company: { name: 'kiewit' },
          },
        ],
        status: AsyncStates.Success,
      },
    });

    render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    const row1 = screen.getByTestId('row_1');
    expect(row1).toBeInTheDocument();
    const row2 = screen.getByTestId('row_2');
    expect(row2).toBeInTheDocument();

    // should not have satisfied the condition inside of the `useEffect`
    expect(store.getActions()).toEqual([]);
  });
});
