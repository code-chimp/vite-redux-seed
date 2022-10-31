import { createBrowserRouter } from 'react-router-dom';
import AppRoutes from './@enums/AppRoutes';
import Counter from './pages/Counter';
import FourOhFour from './pages/FourOhFour';
import NotificationsDemo from './pages/NotificationsDemo';
import Users from './pages/Users';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: AppRoutes.Home,
    element: <MainLayout />,
    errorElement: <FourOhFour />,
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
    ],
  },
]);

export default router;
