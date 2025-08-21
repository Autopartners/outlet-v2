import { StrictMode, useState, useEffect } from 'react';
import './styles/global.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { queryClient } from '../shared/lib/react-query';
import mantineTheme from './styles/mantineTheme';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import MeProvider from './providers/me/meProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/app/providers/app/appProvider';
import { initialize } from '@/shared/lib/api';
import { isLocalhost } from '@/shared/lib/api';
import { CustomLoader } from '@/shared/ui/Loader/Loader';
import { ServerUnavailable } from '@/shared/ui/ServerUnavailable/ServerUnavailable';

function Main() {
  const [serverStatus, setServerStatus] = useState<'server_loaded' | 'server_unavailable' | 'server_loading'>('server_loading');

  useEffect(() => {
    initialize((status) => {
      setServerStatus(status);
    });
  }, []);

  useEffect(() => {
    if (isLocalhost) {
      document.title = `[DEV] ${document.title}`;
    }
  }, []);

  return serverStatus !== 'server_loaded' ? (
    <MantineProvider theme={mantineTheme}>
      {serverStatus === 'server_loading' ? <CustomLoader label="Подключаемся к серверу..." /> : <ServerUnavailable />}
    </MantineProvider>
  ) : (
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
}

export default Main;
