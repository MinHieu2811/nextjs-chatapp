import Head from 'next/head';
import * as React from 'react';

export interface LayoutProps {
    children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>ChatApp</title>
                <meta name="description" content="This is an real-time chatapp" />
            </Head>
            <main>
                {children}
            </main>
        </>
    );
}
