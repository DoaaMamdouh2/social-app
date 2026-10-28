import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import { router } from './Routing/AppRouter/AppRouter';
import { Toaster } from 'react-hot-toast';
import { CounterContext } from './Components/CounterContext/CounterContext';
import { AuthUserContextProvider } from './Components/AuthUserContext/AuthUserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const query = new QueryClient()

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <QueryClientProvider client={query}>
<AuthUserContextProvider>
    <CounterContext>
      <RouterProvider router={router} />
      <Toaster />
    </CounterContext>
    </AuthUserContextProvider>
  <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
