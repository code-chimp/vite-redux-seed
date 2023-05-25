/* ignore generic component in coverage report */
/* istanbul ignore file -- @preserve */
import IUser from '../../../../@interfaces/jsonApi/IUser';
import api from '../';

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<Array<IUser>, void>({
      query: () => '/users',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
        { type: 'Users', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
