import { createBrowserRouter, Navigate, RouteObject } from 'react-router';

// INFO: Pages
import Main from '@/pages/Main';
import Sub from '@/pages/Sub';
import Page404 from '@/pages/404';

// INFO: Layout
import * as Layout from '@/layout';

import { PATHS } from './paths';

const ROUTES: RouteObject[] = [
  {
    path: PATHS.ROOT(),
    element: <Layout.CommonLayout />,
    children: [
      // INFO: Root 접근 시, Main 페이지로 이동
      { index: true, element: <Navigate to={PATHS.MAIN()} replace /> },
      {
        path: PATHS.MAIN(),
        element: <Layout.MainLayout />,
        children: [{ index: true, element: <Main /> }],
      },
      {
        path: PATHS.SUB(),
        element: <Layout.SubLayout />,
        children: [{ index: true, element: <Sub /> }],
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
