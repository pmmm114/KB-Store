import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

const CommonLayout = () => {
  return (
    <div className="max-w-[390px] bg-black box-shadow-[0_4px_10px_0_rgba(39,56,85,.2),inset_2px_2px_0_0_#fff]">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </div>
  );
};

export default CommonLayout;
