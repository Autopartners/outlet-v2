import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { queryClient } from '../shared/lib/react-query';
import mantineTheme from './styles/mantineTheme.ts';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import MeProvider from './providers/me/meProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/app/providers/app/appProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <MeProvider>
            <MantineProvider theme={mantineTheme}>
              <ModalsProvider>
                <Notifications />
                <App />
              </ModalsProvider>
            </MantineProvider>
          </MeProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
