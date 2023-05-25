import { setupApiStore } from '../../../helpers';
import jsonPlaceholderService from './jsonPlaceholderService';
import { jsonPlaceholderUsersService } from './endpoints/jsonPlaceholderUsersService';

describe('store / services / jsonPlaceholder / jsonPlaceholderService', () => {
  const storeRef = setupApiStore(jsonPlaceholderService);

  describe('users', () => {
    it('should issue correct get-all', async () => {
      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.getUsers.initiate(),
      );
      const expectedRecordCount = 10;

      expect(result.data.length).toBe(expectedRecordCount);
    });
  });
});
