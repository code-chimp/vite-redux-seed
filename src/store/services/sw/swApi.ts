import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SWAPI_URI });

const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery,
  tagTypes: ['Vehicles'],
  endpoints: () => ({}),
});

export default swApi;
