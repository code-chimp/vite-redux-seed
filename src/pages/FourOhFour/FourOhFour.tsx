/* ignore generic component in coverage report */
/* istanbul ignore file -- @preserve */
import { useRouteError } from 'react-router-dom';

export default function FourOhFour() {
  const error = useRouteError() as Error;

  return (
    <div className="error-page">
      <h1>Page not found.</h1>
      <p>Sorry, we were unable to locate the resource that you have requested.</p>
      {error ? <p>{error.message || JSON.stringify(error)}</p> : null}
    </div>
  );
}
