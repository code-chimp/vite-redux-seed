import {
  createDeleteRequest,
  createGetRequest,
  createPatchRequest,
  createPostRequest,
  createPutRequest,
  processApiResponse,
  unwrapServiceError,
} from './service';
import FetchMethods from '../@enums/FetchMethods';

import HttpStatusCodes from '../@enums/HttpStatusCodes';
import IApiBaseResponse from '../@interfaces/IApiBaseResponse';
import { GENERIC_SERVICE_ERROR } from '../constants';

const adminApiUri = import.meta.env.VITE_API_URI;
const fakeEndpoint = '/api/22.19/bubbas/burger/barn';

describe('helpers / service', () => {
  describe('createGetRequest', () => {
    it('should generate a Request with a `GET` method', () => {
      const result: Request = createGetRequest(fakeEndpoint);

      expect(result.method).toBe(FetchMethods.Get);
      // there will be an underscore (_) query param appended to the url since we
      //   have cache set to false for all requests
      expect(result.url.startsWith(`${adminApiUri}${fakeEndpoint}`)).toBe(true);
      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(false);
    });

    it('should have a authorization and content-type headers when passed a token', () => {
      const result: Request = createGetRequest(fakeEndpoint, null, 'fake_ol_token');

      expect(result.headers.has('Authorization')).toBe(true);
      expect(result.headers.has('Content-Type')).toBe(false);
    });
  });

  describe('createPostRequest', () => {
    it('should generate a Request with a `POST` method', () => {
      const result: Request = createPostRequest(fakeEndpoint);

      expect(result.method).toBe(FetchMethods.Post);
      expect(result.url).toBe(`${adminApiUri}${fakeEndpoint}`);
      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(false);
    });

    it('should have a content-type header when given a body', () => {
      const fakeBody = { id: 5, foo: 'bar' };
      const result: Request = createPostRequest(fakeEndpoint, fakeBody);

      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('X-Session-Id')).toBe(false);
      expect(result.headers.has('X-RequestLog-Id')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(true);
    });
  });

  describe('createPatchRequest', () => {
    it('should generate a Request with a `PATCH` method', () => {
      const result: Request = createPatchRequest(fakeEndpoint);

      expect(result.method).toBe(FetchMethods.Patch);
      expect(result.url).toBe(`${adminApiUri}${fakeEndpoint}`);
      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(false);
    });
  });

  describe('createPutRequest', () => {
    it('should generate a Request with a `PUT` method', () => {
      const result: Request = createPutRequest(fakeEndpoint);

      expect(result.method).toBe(FetchMethods.Put);
      expect(result.url).toBe(`${adminApiUri}${fakeEndpoint}`);
      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(false);
    });
  });

  describe('createDeleteRequest', () => {
    it('should generate a Request with a `DELETE` method', () => {
      const result: Request = createDeleteRequest(fakeEndpoint);

      expect(result.method).toBe(FetchMethods.Delete);
      expect(result.url).toBe(`${adminApiUri}${fakeEndpoint}`);
      expect(result.headers.has('Authorization')).toBe(false);
      expect(result.headers.has('Content-Type')).toBe(false);
    });
  });

  describe('processApiResponse<T>', () => {
    it('should return a payload of the provided type from a simple response', async () => {
      interface ITest {
        field1: string;
        field2: string;
      }

      const body: ITest = {
        field1: 'foo',
        field2: 'bar',
      };

      const response = new Response(JSON.stringify(body), {
        status: HttpStatusCodes.Ok,
      });

      const payload = await processApiResponse<ITest>(response);

      expect(payload).not.toBeUndefined();
      expect(payload).not.toBeNull();
      expect(typeof payload).toBe('object');
      expect(typeof payload.field1).toBe('string');
      expect(typeof payload.field2).toBe('string');
    });

    it('should return a payload of the provided type from a compound response', async () => {
      interface ITest extends IApiBaseResponse {
        data: string;
      }

      const body: ITest = {
        status: HttpStatusCodes.Ok,
        success: true,
        requestId: 'iamnotarealboy',
        data: 'we got one',
      };

      const response = new Response(JSON.stringify(body), {
        status: HttpStatusCodes.Ok,
      });

      const payload = await processApiResponse<string>(response);

      expect(payload).not.toBeUndefined();
      expect(payload).not.toBeNull();
      expect(typeof payload).toBe('string');
    });

    it('should throw an error if the compound payload is bad', async () => {
      const body: IApiBaseResponse = {
        status: HttpStatusCodes.BadRequest,
        success: false,
        requestId: 'iamnotarealboy',
        errors: ['i am not the happy'],
      };

      const response = new Response(JSON.stringify(body), {
        status: HttpStatusCodes.Ok,
      });

      try {
        await processApiResponse<string>(response);
      } catch (e: any) {
        expect(e.errors.length).toBeTruthy();
      }
    });

    it('should throw an access error for an unauthorized user', async () => {
      const response = new Response(null, {
        status: HttpStatusCodes.Unauthorized,
      });

      try {
        await processApiResponse<any>(response);
      } catch (e: any) {
        expect(e.message).toBe('you do not have access to this resource');
      }
    });

    it('should throw an access error for a forbidden response', async () => {
      const response = new Response(null, {
        status: HttpStatusCodes.Forbidden,
      });

      try {
        await processApiResponse<any>(response);
      } catch (e: any) {
        expect(e.message).toBe('you do not have access to this resource');
      }
    });

    it('should throw a non-specific error for a bad response', async () => {
      const response = new Response(null, {
        status: HttpStatusCodes.BadRequest,
      });

      try {
        await processApiResponse<any>(response);
      } catch (e: any) {
        expect(e.message).toBe(GENERIC_SERVICE_ERROR);
      }
    });
  });

  describe('unwrapServiceError', () => {
    it('should return a standard Error', () => {
      const sut = new Error('test error');
      const methodName = 'unwrapped';

      const serviceError: any = unwrapServiceError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.message}`);
    });

    it('should return a standard Error from a custom thrown error', () => {
      const sut = {
        message: 'yeah, no',
        errors: ['you should see me', 'but not me'],
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapServiceError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.errors[0]}`);
      expect(serviceError.message).not.toBe(`${methodName} error: ${sut.errors[1]}`);
    });
  });
});
