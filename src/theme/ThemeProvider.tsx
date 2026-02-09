
import React from 'react';

type Props = {
    children: React.ReactNode;
};

function ThemeProvider(props: Props) {
    return <>{props.children}</>;
}

export default ThemeProvider;

