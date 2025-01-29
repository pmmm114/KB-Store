import type { PropsWithChildren } from 'react';

interface ISubLayoutProps {}

const SubLayout = ({ children }: PropsWithChildren<ISubLayoutProps>) => {
  return children;
};

export default SubLayout;
