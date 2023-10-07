import React from 'react';

type Props = {
    children?: JSX.Element;
    token?: any
};

const MainLayout = ({children, token}: Props) => <div
    className={`w-full ${token ? 'mt-20' : ''}`}>{children}</div>;

export default MainLayout;
