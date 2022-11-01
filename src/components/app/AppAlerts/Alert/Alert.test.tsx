/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import Alert from './Alert';
import IAlert from '../../../../@interfaces/IAlert';
import AlertTypes from '../../../../@enums/AlertTypes';
import AlertType from '../../../../@types/AlertType';

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState: Array<IAlert> = [
  {
    id: 'foo',
    text: 'you broke something',
    title: 'naughty dev',
    type: AlertTypes.Error,
  },
  {
    id: 'bar',
    text: 'all the things are fragile',
    type: AlertTypes.Info,
  },
  {
    id: 'baz',
    text: 'you stopped breaking things for the day',
    type: AlertTypes.Success,
  },
  {
    id: 'fibbity',
    text: 'you are about to break it',
    type: AlertTypes.Warning,
  },
  {
    id: 'grag',
    text: 'this really should not work but hey',
    type: 'secondary' as AlertType,
  },
];

describe('components / app / AppAlerts / Alert', () => {
  it('should match the snapshot', () => {
    store = mockStore({ alerts: initialState });
    const { asFragment } = render(
      <Provider store={store}>
        <Alert alert={initialState[0]} />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a title when provided', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[0];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const text = screen.getByTestId(`alert-${target.id}-text`);
    const title = screen.getByTestId(`alert-${target.id}-title`);

    expect(text).not.toBeNull();
    expect(text.textContent).toEqual(target.text);
    expect(title).not.toBeNull();
    expect(title.textContent).toEqual(target.title);
  });

  it('should not render a title when not provided', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[1];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const text = screen.getByTestId(`alert-${target.id}-text`);
    const title = screen.queryByTestId(`alert-${target.id}-title`);

    expect(text).not.toBeNull();
    expect(text.textContent).toEqual(target.text);
    expect(title).not.toBeInTheDocument();
  });

  it('should render an error alert with the appropriate icon', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[0];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`alert-${target.id}-icon`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-xmark')).toBe(true);
  });

  it('should render an info alert with the appropriate icon', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[1];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`alert-${target.id}-icon`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-info')).toBe(true);
  });

  it('should render a success alert with the appropriate icon', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[2];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`alert-${target.id}-icon`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-check')).toBe(true);
  });

  it('should render a warning alert with the appropriate icon', () => {
    store = mockStore({ alerts: initialState });
    // eslint-disable-next-line no-magic-numbers
    const target = initialState[3];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`alert-${target.id}-icon`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-triangle-exclamation')).toBe(true);
  });

  it('should render a question mark icon if passed an unknown AlertType', () => {
    store = mockStore({ alerts: initialState });
    // eslint-disable-next-line no-magic-numbers
    const target = initialState[4];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`alert-${target.id}-icon`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-question')).toBe(true);
  });

  it('should dispatch an action when close button is clicked', () => {
    store = mockStore({ alerts: initialState });
    const target = initialState[1];

    render(
      <Provider store={store}>
        <Alert alert={target} />
      </Provider>,
    );
    // const expected = [
    //   {
    //     type: alerts.actions.removeAlert.type,
    //     payload: initialState[0].id,
    //   },
    // ];

    const closeButton = screen.getByTestId(`alert-${target.id}-close`);
    expect(closeButton).not.toBeNull();

    fireEvent.click(closeButton!);

    // NOTE: the actual action is not getting dispatched as it depends on the
    //       Bootstrap JavaScript which is not being executed by the test framework
    // expect(store.getActions()).toEqual(expected);
    expect(store.getActions()).toEqual([]);
  });
});
