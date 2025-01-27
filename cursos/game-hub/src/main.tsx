import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Provider from '@/components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
