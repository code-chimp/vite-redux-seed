/* ignore generic component in coverage report */
/* istanbul ignore file -- @preserve */
import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorPage: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="error-page">
      <h1>Something went wrong.</h1>
      <p>Sorry, there was an unexpected error</p>
      {error ? <p>{error.message || JSON.stringify(error)}</p> : null}
    </div>
  );
};

export default ErrorPage;
