import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStates from '../../@enums/AsyncStates';
import IUser from '../../@interfaces/IUser';
import AsyncStatus from '../../@types/AsyncStatus';
import { fetchUsers } from '../../services/user/UsersApi';
import { IStore } from '../';

export interface IUserSlice {
  current: IUser | null;
  users: Array<IUser>;
  status: AsyncStatus;
  error: string | null;
}

export const initialState: IUserSlice = {
  current: null,
  users: [],
  status: AsyncStates.Idle,
  error: null,
};

export const loadUsers = createAsyncThunk(
  'users/fetchUsers',
  async (arg: void, { rejectWithValue }) => {
    try {
      return await fetchUsers();
    } catch (e: any) {
      return rejectWithValue(e.message || 'Internal Server Error');
    }
  },
);

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser: (state: IUserSlice) => {
      state.current = null;
    },
    setCurrentUser: (state: IUserSlice, action: { type: string; payload: number }) => {
      const user = state.users.find(x => x.id === action.payload);

      if (user) {
        state.current = user;
        state.error = null;
      } else {
        state.current = null;
        state.error = 'user not found';
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, (state: IUserSlice) => {
      state.status = AsyncStates.Pending;
    });

    builder.addCase(
      loadUsers.fulfilled,
      (state: IUserSlice, { payload }: PayloadAction<Array<IUser> | undefined>) => {
        state.status = AsyncStates.Success;
        state.users = payload ? (payload as Array<IUser>) : [];
        // or you could make it an additive operation
        // state.users = [...state.users, ...(action.payload as Array<IUser>)];
      },
    );

    builder.addCase(loadUsers.rejected, (state: IUserSlice, action: any) => {
      state.status = AsyncStates.Fail;
      state.error = action.payload as string;
      state.users = [];
    });
  },
});

/* Ignore selectors in test coverage report due to simplicity */
/* istanbul ignore next */
export const selectCurrentUser = (state: IStore) => state.user.current;

/* istanbul ignore next */
export const selectUsers = (state: IStore) => state.user.users;

export const { setCurrentUser, clearCurrentUser } = user.actions;

export default user.reducer;
