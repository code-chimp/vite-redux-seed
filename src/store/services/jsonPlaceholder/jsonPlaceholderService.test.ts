import { setupApiStore } from '../../../helpers';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockUsers } from '../../../@mocks/jsonApi/users';
import { jsonPlaceholderUsersService } from './endpoints/jsonPlaceholderUsersService';
import jsonPlaceholderService from './jsonPlaceholderService';
import IUser from '../../../@interfaces/jsonApi/IUser';

describe('store / services / jsonPlaceholder / jsonPlaceholderService', () => {
  const storeRef = setupApiStore(jsonPlaceholderService);

  describe('users', () => {
    const newUser: Partial<IUser> = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@user.com',
      address: {
        street: '123 Test St',
        suite: 'Suite 123',
        city: 'Test City',
        zipcode: '12345-6789',
        geo: {
          lat: '123.456',
          lng: '123.456',
        },
      },
      phone: '123-456-7890',
      website: 'testuser.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Test catch phrase',
        bs: 'Test bs',
      },
    };

    it('should fetch all', async () => {
      const expectedRecordCount = 10;

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.getUsers.initiate(),
      );

      expect(result.isSuccess).toBe(true);
      expect(result.isError).toBe(false);
      expect(result.data.length).toBe(expectedRecordCount);
    });

    it('should fetch one', async () => {
      const id = 4;
      const expected = mockUsers.find(u => u.id === id);

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.getUser.initiate(id),
      );

      expect(result.isSuccess).toBe(true);
      expect(result.isError).toBe(false);
      expect(result.data).toEqual(expected);
    });

    it('should fail with not-found if one not found', async () => {
      const id = 999;

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.getUser.initiate(id),
      );

      expect(result.isSuccess).toBe(false);
      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
      expect(result.error.status).toEqual(HttpStatusCodes.NotFound);
    });

    it('should add one', async () => {
      const id = mockUsers.length;

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.addUser.initiate(newUser),
      );

      expect(result.data).toEqual({ id, ...newUser });
    });

    it('should update one', async () => {
      const id = 4;
      const existing = mockUsers.find(u => u.id === id);
      const updatedUser: Partial<IUser> = {
        id,
        name: 'Updated User',
        username: 'updateduser',
      };

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.updateUser.initiate(updatedUser),
      );

      console.info(result);

      expect(result.data).toEqual({ ...existing, ...updatedUser });
    });

    it('should error on invalid update request', async () => {
      const updatedUser: Partial<IUser> = {
        id: 99,
        name: 'Invalid User',
        username: 'idontlivehere',
      };

      const result = await storeRef.store.dispatch(
        jsonPlaceholderUsersService.endpoints.updateUser.initiate(updatedUser),
      );

      console.info(result);

      expect(result.error).toBeDefined();
      expect(result.error.status).toBe(HttpStatusCodes.NotFound);
    });
  });
});