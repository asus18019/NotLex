'use client';
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState, ReactNode } from 'react';
import AuthContextProvider from '@/context/AuthContextProvider';

export default function RootLayout({
    children
}: {
    children: ReactNode
}) {
    const [isMobile, setIsMobile] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const isWiderThan900Px = window.screen.width > 900;

        setShowMenu(isWiderThan900Px);
        setIsMobile(!isWiderThan900Px);
    }, []);

    return (
            <html lang="en">
            <body>
            <SimpleBar style={ { maxHeight: '100vh' } }>
                <AuthContextProvider>
                    <Container maxWidth="lg">
                        <Nav showMenu={ showMenu } setShowMenu={ () => isMobile && setShowMenu(!showMenu) }/>
                        { children }
                    </Container>
                </AuthContextProvider>
            </SimpleBar>
            </body>
            </html>
    );
}
