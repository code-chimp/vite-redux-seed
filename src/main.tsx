import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
import AppAlerts from './components/app/AppAlerts';
import AppToasts from './components/app/AppToasts';
import './styles/global.scss';
import store from './store';
import routes from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/ErrorPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Provider store={store}>
        <AppAlerts />
        <AppToasts />
        <RouterProvider router={createBrowserRouter(routes)} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
