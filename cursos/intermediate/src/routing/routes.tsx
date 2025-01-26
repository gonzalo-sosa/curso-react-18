import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import UserPage from './UserPage';
import UserDetail from './UserDetail';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users',
        element: <UserPage />,
        children: [
          {
            path: ':id',
            element: <UserDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
