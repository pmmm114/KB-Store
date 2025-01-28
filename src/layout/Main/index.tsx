import type { PropsWithChildren } from "react";

interface IMainLayoutProps {}

const MainLayout = ({children}: PropsWithChildren<IMainLayoutProps>) => {
    return children;
}

export default MainLayout;