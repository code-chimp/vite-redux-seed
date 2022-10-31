import IUser from '../../@interfaces/IUser';
import { createGetRequest, processApiResponse, unwrapServiceError } from '../../helpers';

export const fetchUsers = async (): Promise<Array<IUser>> => {
  try {
    const response = await fetch(createGetRequest('/users'));

    return await processApiResponse<Array<IUser>>(response);
  } catch (e) {
    throw unwrapServiceError('UsersApi.fetchUsers', e);
  }
};

export const fetchUser = async (id: number): Promise<IUser> => {
  try {
    const response = await fetch(createGetRequest(`/users/${id}`));

    return await processApiResponse<IUser>(response);
  } catch (e) {
    throw unwrapServiceError('UsersApi.fetchUser', e);
  }
};
