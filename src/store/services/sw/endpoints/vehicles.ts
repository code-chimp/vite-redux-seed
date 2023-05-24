/* ignore generic component in coverage report */
/* istanbul ignore file -- @preserve */
import IVehicle from '../../../../@interfaces/swApi/IVehicle';
import api from '../';

export const vehiclesApi = api.injectEndpoints({
  endpoints: builder => ({
    getVehicles: builder.query<Array<IVehicle>, void>({
      query: () => '/vehicles',
      providesTags: (result = []) => [
        ...result.map(({ url }) => ({ type: 'Vehicles', url } as const)),
        { type: 'Vehicles', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetVehiclesQuery } = vehiclesApi;
