/* eslint-disable @typescript-eslint/ban-ts-comment */
import thunk from 'redux-thunk';
import { Mock } from 'vitest';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { initialState, IUserSlice, loadUsers, user } from './user';
import AsyncStates from '../../@enums/AsyncStates';
import IUser from '../../@interfaces/IUser';
import { mockUsers } from '../../@mocks/users';

import * as usersApi from '../../services/user/UsersApi';
vi.mock('../../services/user/UsersApi');

describe('store / slices / user', () => {
  describe('reducer(s)', () => {
    describe('setCurrentUser', () => {
      it('should set the current user from the list of users', () => {
        const { setCurrentUser } = user.actions;
        const users: Array<IUser> = [...mockUsers];

        let state: IUserSlice = {
          ...initialState,
          users: [...users],
        };

        state = user.reducer(state, setCurrentUser(1));

        expect(state.current).not.toBeNull();
        expect(state.current).toEqual(users[0]);
      });

      it('should clear current user and set an error if passed invalid id', () => {
        const { setCurrentUser } = user.actions;
        const users: Array<IUser> = [...mockUsers];

        let state: IUserSlice = {
          ...initialState,
          users: [...users],
        };

        state = user.reducer(state, setCurrentUser(100));

        expect(state.current).toBeNull();
        expect(state.error).toEqual('user not found');
      });
    });

    describe('clearCurrentUser', () => {
      it('should clear the current user', () => {
        const { clearCurrentUser } = user.actions;

        let state: IUserSlice = {
          ...initialState,
          current: { ...mockUsers[0] },
        };

        state = user.reducer(state, clearCurrentUser());

        expect(state.current).toBeNull();
      });
    });

    describe('loadUsers', () => {
      it('should set loading status to pending when loading users', () => {
        const action = { type: loadUsers.pending.type };
        const state: IUserSlice = user.reducer(initialState, action);

        expect(state.status).toEqual(AsyncStates.Pending);
      });

      it('should set the `users` property on the slice', () => {
        const action = {
          type: loadUsers.fulfilled.type,
          payload: [...mockUsers],
        };
        const state: IUserSlice = user.reducer(initialState, action);

        expect(state.status).toEqual(AsyncStates.Success);
        expect(state.users).not.toBeNull();
        expect(state.users.length).toEqual(mockUsers.length);
        expect(state.error).toBeNull();
      });

      it('should set correct loading status and error message when loading users fails', () => {
        const mockError = {
          error: 'mock error',
        };
        const action = {
          type: loadUsers.rejected.type,
          payload: mockError,
        };

        const state: IUserSlice = user.reducer(initialState, action);

        expect(state.status).toEqual(AsyncStates.Fail);
        expect(state.error).toEqual(mockError);
      });
    });
  });

  describe('thunk(s)', () => {
    const mockStore = configureMockStore([thunk]);
    // eslint-disable-next-line @typescript-eslint/ban-types
    let store: MockStoreEnhanced<unknown, {}>;

    describe('loadUsers', () => {
      beforeEach(() => {
        store = mockStore(initialState);
      });

      it('should dispatch `pending` and `succeed` actions', async () => {
        const mockResponse: Array<IUser> = [...mockUsers];
        (usersApi.fetchUsers as Mock).mockResolvedValueOnce(mockResponse);

        const expectedTypes = [loadUsers.pending.type, loadUsers.fulfilled.type];

        // @ts-ignore
        await store.dispatch(loadUsers());

        const receivedActions = store.getActions();
        const receivedTypes = receivedActions.map(action => action.type);
        const fulfilledAction = receivedActions.find(
          action => action.type === loadUsers.fulfilled.type,
        );

        expect(receivedTypes).toEqual(expectedTypes);
        expect(fulfilledAction).not.toBeNull();
        expect(fulfilledAction.payload).toEqual(mockResponse);
      });

      it('should dispatch `pending` and `rejected` actions', async () => {
        const mockError = new Error('mock error');
        (usersApi.fetchUsers as Mock).mockRejectedValueOnce(mockError);

        const expectedTypes = [loadUsers.pending.type, loadUsers.rejected.type];

        // @ts-ignore
        await store.dispatch(loadUsers());

        const receivedActions = store.getActions();
        const receivedTypes = receivedActions.map(action => action.type);
        const errorAction = receivedActions.find(
          action => action.type === loadUsers.rejected.type,
        );

        expect(receivedTypes).toEqual(expectedTypes);
        expect(errorAction.error.message).toBe('Rejected');
        expect(errorAction.payload).toBe(mockError.message);
      });
    });
  });
});
