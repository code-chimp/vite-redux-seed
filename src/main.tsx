import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
import AppAlerts from './components/app/AppAlerts';
import AppToasts from './components/app/AppToasts';
import './styles/global.scss';
import store from './store';
import routes from './routes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppAlerts />
      <AppToasts />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
);
