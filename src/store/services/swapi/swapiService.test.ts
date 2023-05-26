import { setupApiStore } from '../../../helpers';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockVehicles } from '../../../@mocks/swApi/vehicles';
import swapiVehiclesService from './endpoints/swapiVehiclesService';
import swapiService from './swapiService';

describe('store / services / swapi / swapiService', () => {
  const storeRef = setupApiStore(swapiService);

  describe('vehicles', () => {
    it('should fetch all', async () => {
      const expectedRecordCount = 3;

      const result = await storeRef.store.dispatch(
        swapiVehiclesService.endpoints.getVehicles.initiate(),
      );

      expect(result.data.length).toBe(expectedRecordCount);
    });

    it('should fetch one', async () => {
      const id = 99; // AT-AT
      const dto = mockVehicles.find(
        v => v.url === `${import.meta.env.VITE_SWAPI_URI}/vehicles/${id}/`,
      );
      const expected = { id, ...dto };

      const result = await storeRef.store.dispatch(
        swapiVehiclesService.endpoints.getVehicle.initiate(id),
      );

      expect(result.isSuccess).toBe(true);
      expect(result.isError).toBe(false);
      expect(result.data).toEqual(expected);
    });

    it('should fail with not-found if one not found', async () => {
      const id = 0; // literally nothing

      const result = await storeRef.store.dispatch(
        swapiVehiclesService.endpoints.getVehicle.initiate(id),
      );

      expect(result.isSuccess).toBe(false);
      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
      expect(result.error.status).toEqual(HttpStatusCodes.NotFound);
    });
  });
});
