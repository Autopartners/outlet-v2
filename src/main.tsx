import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import App from './App.tsx'
import {QueryClientProvider} from "@tanstack/react-query";
import {MantineProvider} from "@mantine/core";
import {queryClient} from "./lib/react-query.ts";
import theme from "./theme.ts";
import { Notifications } from '@mantine/notifications'
import {ModalsProvider} from "@mantine/modals";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <ModalsProvider>
                  <Notifications />
                  <App />
              </ModalsProvider>
          </MantineProvider>
      </QueryClientProvider>
  </StrictMode>,
)
