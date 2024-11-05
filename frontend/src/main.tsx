import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/app';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <React.Suspense>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
