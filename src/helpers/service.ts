import FetchMethods from '../@enums/FetchMethods';
import FetchRequestType from '../@types/FetchRequestType';
import HttpStatusCodes from '../@enums/HttpStatusCodes';
import { ACCESS_ERROR, GENERIC_SERVICE_ERROR } from '../constants';

const apiUri = import.meta.env.VITE_API_URI;

function createRequest(method: FetchRequestType) {
  return (url: string, body?: any, token?: string): Request => {
    const headers: Headers = new Headers({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });

    if (body) {
      headers.append('Content-Type', 'application/json');
    }

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const init: RequestInit = {
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers,
    };

    if (token) {
      init.credentials = 'include';
    }

    if (body) {
      init.body = JSON.stringify(body);
    }

    return new Request(`${apiUri}${url}`, init);
  };
}

export const createGetRequest = createRequest(FetchMethods.Get);
export const createPatchRequest = createRequest(FetchMethods.Patch);
export const createPostRequest = createRequest(FetchMethods.Post);
export const createPutRequest = createRequest(FetchMethods.Put);
export const createDeleteRequest = createRequest(FetchMethods.Delete);

export async function processApiResponse<Type>(response: Response): Promise<Type> {
  if (response.ok) {
    const payload = await response.json();

    // see if we have a compound API response
    if (payload.status && (payload.data || payload.errors)) {
      if (!payload.success) {
        throw payload;
      }

      return payload.data as Type;
    }

    return payload as Type;
  }

  if (
    response.status === HttpStatusCodes.Unauthorized ||
    response.status === HttpStatusCodes.Forbidden
  ) {
    throw new Error(ACCESS_ERROR);
  }

  throw new Error(GENERIC_SERVICE_ERROR);
}

export const unwrapServiceError = (serviceMethod: string, error: any): Error => {
  return new Error(
    `${serviceMethod} error: ${error.errors ? error.errors[0] : error.message}`,
  );
};
