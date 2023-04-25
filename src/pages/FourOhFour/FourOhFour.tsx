/* istanbul ignore file -- @preserve */
import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function FourOhFour() {
  const error = useRouteError() as Error;

  return (
    <div className="error-page">
      <h1>Something went wrong.</h1>
      <p>Sorry, there was an unexpected error</p>
      <p>{error.message || JSON.stringify(error)}</p>
    </div>
  );
}
