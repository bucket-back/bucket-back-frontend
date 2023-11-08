import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { router } from './core/routes';
import GlobalStyle from './shared/styles/GlobalStyle';
import './main.css';

async function deferRender() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./core/mocks/browser');

  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ChakraProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  );
});
