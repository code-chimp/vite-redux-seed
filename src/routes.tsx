import { RouteObject } from 'react-router-dom';
import AppRoutes from './@enums/AppRoutes';
import MainLayout from './layouts/MainLayout';
import FourOhFour from './pages/FourOhFour';
import Counter from './pages/Counter';
import NotificationsDemo from './pages/NotificationsDemo';
import Users from './pages/Users';

const routes: Array<RouteObject> = [
  {
    path: AppRoutes.Home,
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.Home,
        element: <Counter />,
      },
      {
        path: AppRoutes.Notifications,
        element: <NotificationsDemo />,
      },
      {
        path: AppRoutes.Users,
        element: <Users />,
      },
      {
        path: AppRoutes.Fallthrough,
        element: <FourOhFour />,
      },
    ],
  },
];

export default routes;
