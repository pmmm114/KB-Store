import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import { applyClass } from '@/utils/style/tailwind';

import * as S from './styles';

const CommonLayout = () => {
  return (
    <div className={applyClass(S.COMMON_LAYOUT_TAILWIND_CLASS.LAYOUT)}>
      <header className={applyClass(S.COMMON_LAYOUT_TAILWIND_CLASS.HEADER)}>
        <div>KB DEMO</div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </div>
  );
};

export default CommonLayout;
