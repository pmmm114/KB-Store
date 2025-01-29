import { createBrowserRouter, Navigate, RouteObject } from 'react-router';

import { PATHS } from './paths';
import * as Layout from '@/layout';
import Page404 from '@/pages/404';

const ROUTES: RouteObject[] = [
  {
    path: PATHS.ROOT(),
    element: <Layout.CommonLayout />,
    children: [
      {
        path: PATHS.MAIN(),
        element: <Layout.MainLayout />,
      },
      {
        path: PATHS.SUB(),
        element: <Layout.SubLayout />,
      },
    ],
  },
  {
    path: PATHS.NOT_FOUND(),
    element: <Page404 />,
  },
  { path: '*', element: <Navigate to={PATHS.NOT_FOUND()} replace /> },
];

export const router = createBrowserRouter(ROUTES);
