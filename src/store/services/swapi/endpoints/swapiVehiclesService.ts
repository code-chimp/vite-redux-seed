import IVehicle from '../../../../@interfaces/swApi/IVehicle';
import IVehicleDto from '../../../../@interfaces/swApi/IVehicleDto';
import IVehiclesResponse from '../../../../@interfaces/swApi/IVehicleResponse';
import api from '../';

const numberRegex = /\d+/;

export const swapiVehiclesService = api.injectEndpoints({
  endpoints: builder => ({
    getVehicles: builder.query<Array<IVehicle>, void>({
      query: () => '/vehicles',
      transformResponse: (response: IVehiclesResponse) => {
        return response.results.map((vehicle: IVehicleDto) => {
          return {
            ...vehicle,
            id: Number((vehicle.url.match(numberRegex) || [-1])[0]),
          };
        });
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Vehicles', id } as const)),
        { type: 'Vehicles', id: 'LIST' },
      ],
    }),

    getVehicle: builder.query<IVehicle, number>({
      query: id => `/vehicles/${id}/`,
      transformResponse: (response: IVehicleDto) => {
        return {
          id: Number((response.url.match(numberRegex) || [-1])[0]),
          ...response,
        };
      },
      providesTags: (_vehicle, _err, id) => [{ type: 'Vehicles', id }],
    }),
  }),
});

export const { useGetVehiclesQuery } = swapiVehiclesService;

export default swapiVehiclesService;
