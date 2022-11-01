/* eslint-disable no-magic-numbers */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { screen, fireEvent, render } from '@testing-library/react';
import { counter } from '../../store/slices/counter';
import Counter from './Counter';

const mockStore = configureMockStore([]);
let store: MockStore;

function getComponent(initialState: number): () => DocumentFragment {
  store = mockStore({
    counter: { value: initialState },
  });

  const { asFragment } = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );

  return asFragment;
}

describe('components / Counter', () => {
  it('should match the snapshot', () => {
    const asFragment = getComponent(0);

    expect(asFragment()).toMatchSnapshot();
  });

  // Testing: Does the component dispatch expected actions
  it('should dispatch an increment action when the add button is clicked', () => {
    getComponent(0);
    const expected = [counter.actions.increment.type];

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const received = store.getActions().map(action => action.type);
    expect(received).toEqual(expected);
  });

  it('should dispatch a decrement action when the subtract button is clicked', () => {
    getComponent(0);
    const expected = [counter.actions.decrement.type];

    const subtractButton = screen.getByTestId('subtract-button');
    expect(subtractButton).toBeInTheDocument();

    fireEvent.click(subtractButton);

    const received = store.getActions().map(action => action.type);
    expect(received).toEqual(expected);
  });

  it('should accurately reflect observed state', () => {
    getComponent(15);
    const expected = '15';

    const outputDisplay = screen.getByTestId('output-display');
    expect(outputDisplay.textContent).toBe(expected);
  });
});
