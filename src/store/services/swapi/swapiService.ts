import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = import.meta.env.VITE_SWAPI_URI;

const baseQuery = fetchBaseQuery({ baseUrl });

const swapiService = createApi({
  reducerPath: 'swApi',
  baseQuery,
  tagTypes: ['Vehicles'],
  endpoints: () => ({}),
});

export default swapiService;
