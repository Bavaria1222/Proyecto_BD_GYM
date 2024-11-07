import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';
import { Layout } from 'src/layouts';

// import { Layout as LayoutBase } from "src/layouts/base";

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const Error404Page = lazy(() => import('src/pages/404'));

export const routesOutlets: RouteObject[] = [
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'page-example',
        element: <PageExample />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
