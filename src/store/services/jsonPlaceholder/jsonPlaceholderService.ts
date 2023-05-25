import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_JSONAPI_URI });

const jsonPlaceholderService = createApi({
  reducerPath: 'jsonApi',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: () => ({}),
});

export default jsonPlaceholderService;
