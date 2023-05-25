import IVehicleDto from './IVehicleDto';

export default interface IVehiclesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IVehicleDto>;
}
