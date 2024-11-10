import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Layout } from 'src/layouts';
import Login from 'src/pages/auth/Login';
// import { Layout as LayoutBase } from "src/layouts/base";
import { routes } from './routes';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData ? children : <Navigate to="/login"
    replace />;
}

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const Error404Page = lazy(() => import('src/pages/404'));
const normalizeRoute = (route: string) => {
  return route.slice(1);
}; export const routesOutlets: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'page-example', element: <PageExample /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: '*', element: <Error404Page /> },
];