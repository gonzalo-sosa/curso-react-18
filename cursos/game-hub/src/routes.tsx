import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layout';
import HomePage from '@/pages/home-page';
import GameDetailPage from '@/pages/game-detail-page';
import ErrorPage from './pages/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'games/:id',
        element: <GameDetailPage />,
      },
    ],
  },
]);

export default router;
