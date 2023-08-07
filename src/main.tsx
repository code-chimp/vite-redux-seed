import 'bootstrap';
import './styles/global.scss';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppAlerts from './components/app/AppAlerts';
import AppToasts from './components/app/AppToasts';
import ErrorPage from './pages/ErrorPage';
import store from './store';
import routes from './routes';

createRoot(document.getElementById('root')! as HTMLDivElement).render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Provider store={store}>
      <AppAlerts />
      <AppToasts />
      <RouterProvider router={createBrowserRouter(routes)} />
    </Provider>
  </ErrorBoundary>,
);
