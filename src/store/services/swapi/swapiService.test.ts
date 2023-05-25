import { setupApiStore } from '../../../helpers';
import swapiService from './swapiService';
import swapiVehiclesService from './endpoints/swapiVehiclesService';

describe('store / services / swapi / swapiService', () => {
  const storeRef = setupApiStore(swapiService);

  describe('vehicles', () => {
    it('should issue correct get-all', async () => {
      const result = await storeRef.store.dispatch(
        swapiVehiclesService.endpoints.getVehicles.initiate(),
      );
      const expectedRecordCount = 3;

      console.info(result);
      expect(result.data.length).toBe(expectedRecordCount);
    });
  });
});
