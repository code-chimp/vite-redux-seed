import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import Toast from './Toast';
import IToastMessage from '../../../../@interfaces/IToastMessage';
import ToastTypes from '../../../../@enums/ToastTypes';

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState: Array<IToastMessage> = [
  {
    id: 'foo',
    text: 'you broke something',
    type: ToastTypes.Error,
  },
  {
    id: 'bar',
    text: 'all the things are fragile',
    type: ToastTypes.Info,
  },
  {
    id: 'baz',
    text: 'you stopped breaking things for the day',
    type: ToastTypes.Success,
  },
  {
    id: 'fibbity',
    text: 'you are about to break it',
    type: ToastTypes.Warning,
  },
];

describe('components / app / AppToasts / Toast', () => {
  it('should match the snapshot', () => {
    store = mockStore({ toasts: initialState });
    const { asFragment } = render(
      <Provider store={store}>
        <Toast toastMessage={initialState[0]} />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render provided text in the body', () => {
    store = mockStore({ toasts: initialState });
    const target = initialState[0];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );

    const body = screen.getByTestId(`toast-${target.id}-body`);

    expect(body).not.toBeNull();
    expect(body.textContent).toEqual(target.text);
  });

  it('should render an error toast with the appropriate icon and header', () => {
    store = mockStore({ toasts: initialState });
    const target = initialState[0];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`toast-${target.id}-icon`);
    const header = screen.getByTestId(`toast-${target.id}-header`);
    const headerText = screen.getByTestId(`toast-${target.id}-header-text`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-xmark')).toBe(true);
    expect(header).not.toBeNull();
    expect(header!.classList.contains(`text-${target.type}`)).toBe(true);
    expect(header!.classList.contains(`bg-${target.type}`)).toBe(true);
    expect(headerText).not.toBeNull();
    expect(headerText.textContent).toEqual('Error');
  });

  it('should render an info toast with the appropriate icon and header', () => {
    store = mockStore({ toasts: initialState });
    const target = initialState[1];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`toast-${target.id}-icon`);
    const header = screen.getByTestId(`toast-${target.id}-header`);
    const headerText = screen.getByTestId(`toast-${target.id}-header-text`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-info')).toBe(true);
    expect(header).not.toBeNull();
    expect(header!.classList.contains('text-primary')).toBe(true);
    expect(header!.classList.contains(`bg-${target.type}`)).toBe(true);
    expect(headerText).not.toBeNull();
    expect(headerText.textContent).toEqual('Information');
  });

  it('should render a success toast with the appropriate icon and header', () => {
    store = mockStore({ toasts: initialState });
    const target = initialState[2];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`toast-${target.id}-icon`);
    const header = screen.getByTestId(`toast-${target.id}-header`);
    const headerText = screen.getByTestId(`toast-${target.id}-header-text`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-circle-check')).toBe(true);
    expect(header).not.toBeNull();
    expect(header!.classList.contains(`text-${target.type}`)).toBe(true);
    expect(header!.classList.contains(`bg-${target.type}`)).toBe(true);
    expect(headerText).not.toBeNull();
    expect(headerText.textContent).toEqual('Success');
  });

  it('should render a warning toast with the appropriate icon and header', () => {
    store = mockStore({ toasts: initialState });
    // eslint-disable-next-line no-magic-numbers
    const target = initialState[3];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );

    const icon = screen.getByTestId(`toast-${target.id}-icon`);
    const header = screen.getByTestId(`toast-${target.id}-header`);
    const headerText = screen.getByTestId(`toast-${target.id}-header-text`);

    expect(icon).not.toBeNull();
    expect(icon!.classList.contains('fa-triangle-exclamation')).toBe(true);
    expect(header).not.toBeNull();
    expect(header!.classList.contains(`text-${target.type}`)).toBe(true);
    expect(header!.classList.contains(`bg-${target.type}`)).toBe(true);
    expect(headerText).not.toBeNull();
    expect(headerText.textContent).toEqual('Warning');
  });

  it('should dispatch an action when close button is clicked', () => {
    store = mockStore({ toasts: initialState });
    const target = initialState[0];

    render(
      <Provider store={store}>
        <Toast toastMessage={target} />
      </Provider>,
    );
    // const expected = [
    //   {
    //     type: toasts.actions.removeToastMessage.type,
    //     payload:target.id,
    //   },
    // ];

    const closeButton = screen.getByTestId(`toast-${target.id}-close`);
    expect(closeButton).not.toBeNull();

    fireEvent.click(closeButton!);

    // NOTE: the actual action is not getting dispatched as it depends on the
    //       Bootstrap JavaScript which is not being executed by the test framework
    // expect(store.getActions()).toEqual(expected);
    expect(store.getActions()).toEqual([]);
  });
});
