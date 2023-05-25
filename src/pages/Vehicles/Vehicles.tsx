/* ignore while prototyping code */
/* istanbul ignore file -- @preserve */
import { FC } from 'react';
import IVehicle from '../../@interfaces/swApi/IVehicle';
import { useGetVehiclesQuery } from '../../store/services/swapi/endpoints/swapiVehiclesService';
import { unwrapRTKQueryError } from '../../helpers';

const Vehicles: FC = () => {
  const { data: vehicles, error, isLoading, isSuccess } = useGetVehiclesQuery();

  return (
    <table className="table">
      <thead>
        <tr className="table-info">
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td data-testid="loading-indicator" colSpan={4}>
              Loading...
            </td>
          </tr>
        ) : isSuccess ? (
          vehicles.map((vehicle: IVehicle) => (
            <tr key={vehicle.url} data-testid={`row_${vehicle.url}`}>
              <td>{vehicle.name}</td>
              <td>{vehicle.manufacturer || 'unknown'}</td>
              <td>{vehicle.model || 'unknown'}</td>
              <td>{vehicle.vehicle_class || 'unknown'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td data-testid="error-indicator" colSpan={4}>
              Error:{' '}
              {error ? unwrapRTKQueryError('Vehicles.tsx', error).message : 'unexpected error'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Vehicles;
