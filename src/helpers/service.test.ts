import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { unwrapRTKQueryError } from './service';
import HttpStatusCodes from '../@enums/HttpStatusCodes';
import httpStatusCodes from '../@enums/HttpStatusCodes';

describe('helpers / service', () => {
  describe('unwrapRTKQueryError', () => {
    it('should normalize a SerializedError', () => {
      const sut: SerializedError = {
        name: 'fake error',
        message: 'these were the droids you were looking for',
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapRTKQueryError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.message}`);
    });

    it('should normalize a FetchBaseQueryError signature 1', () => {
      const sut: FetchBaseQueryError = {
        status: HttpStatusCodes.BadRequest,
        data: ['you should see me', 'at the lol bbq'],
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapRTKQueryError(methodName, sut);
      const errMessage = JSON.stringify(sut.data);

      expect(serviceError.message).toBe(`${methodName} error: ${errMessage}`);
    });

    it('should normalize a FetchBaseQueryError signature 2', () => {
      const sut: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        data: undefined,
        error: 'you done messed up Buhlahkay',
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapRTKQueryError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.error}`);
    });

    it('should normalize a FetchBaseQueryError signature 3', () => {
      const sut: FetchBaseQueryError = {
        status: 'PARSING_ERROR',
        originalStatus: httpStatusCodes.InternalServerError,
        data: 'not the message',
        error: 'should be the message',
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapRTKQueryError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.error}`);
    });

    it('should normalize a FetchBaseQueryError signature 4', () => {
      const sut: FetchBaseQueryError = {
        status: 'CUSTOM_ERROR',
        data: ['bob'],
        error: 'bob is not in the message',
      };
      const methodName = 'unwrapped';

      const serviceError: any = unwrapRTKQueryError(methodName, sut);

      expect(serviceError.message).toBe(`${methodName} error: ${sut.error}`);
    });
  });
});
