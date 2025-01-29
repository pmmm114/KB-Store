import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

const CommonLayout = () => {
  return (
    <div className="CommonLayout">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </div>
  );
};

export default CommonLayout;
