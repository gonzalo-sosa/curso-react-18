import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/layout';
import HomePage from '@/pages/home-page';
import GameDetailPage from '@/pages/game-detail-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
