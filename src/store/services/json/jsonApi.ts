import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URI });

const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: () => ({}),
});

export default jsonApi;
