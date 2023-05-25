import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const unwrapRTKQueryError = (
  serviceMethod: string,
  error: FetchBaseQueryError | SerializedError,
): Error => {
  if ('status' in error) {
    return new Error(
      `${serviceMethod} error: ${'error' in error ? error.error : JSON.stringify(error.data)}`,
    );
  }

  return new Error(`${serviceMethod} error: ${error.message}`);
};
