import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'src/layouts';
import Login from 'src/pages/auth/Login';
import Empleado from 'src/pages/empleados/empleado';
import EmpleadosLista from 'src/pages/empleados/empleados';
import GimnasiosLista from 'src/pages/gimnasio/gimnasios';
import MaquinasLista from 'src/pages/maquina/maquinas';
// import { Layout as LayoutBase } from "src/layouts/base";
import { routes } from './routes';
import Maquina from 'src/pages/maquina/maquina';
import MembresiasLista from 'src/pages/membresias/membresias';
import Membresia from 'src/pages/membresias/membresia';


function ProtectedRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const Error404Page = lazy(() => import('src/pages/404'));
const normalizeRoute = (route: string) => {
  return route.slice(1);
};
export const routesOutlets: RouteObject[] = [
  {
    path: '/',
    element: (
      /*<ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
*/
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'page-example', element: <PageExample /> },
      { path: 'empleados', element: <EmpleadosLista /> },
      { path: 'empleado', element: <Empleado /> },
      { path: 'empleado/:id', element: <Empleado /> },
      { path: 'gimnasios', element: <GimnasiosLista /> },
      { path: 'maquinas', element: <MaquinasLista /> },
      { path: 'maquina', element: <Maquina /> },
      { path: '/maquina/:id', element: <Maquina /> },
      { path: 'membresias', element: <MembresiasLista /> },
      { path: 'membresia', element: <Membresia /> },
      { path: '/membresia/:id', element: <Membresia /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: '*', element: <Error404Page /> },
];
