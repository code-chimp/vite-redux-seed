/* ignore generic component in coverage report */
/* istanbul ignore file -- @preserve */
import IUser from '../../../../@interfaces/jsonApi/IUser';
import api from '../';

export const jsonPlaceholderUsersService = api.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<Array<IUser>, void>({
      query: () => '/users',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
        { type: 'Users', id: 'LIST' },
      ],
    }),

    getUser: builder.query<IUser, number>({
      query: id => `/users/${id}`,
      providesTags: (_user, _err, id) => [{ type: 'Users', id }],
    }),

    addUser: builder.mutation<IUser, Partial<IUser>>({
      query: body => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: user => [{ type: 'Users', id: user?.id }],
    }),

    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
} = jsonPlaceholderUsersService;
