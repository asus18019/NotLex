'use client';
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import { useEffect, useState, ReactNode } from 'react';

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
            <Container maxWidth="lg">
                <Nav showMenu={ showMenu } setShowMenu={ () => isMobile && setShowMenu(!showMenu) }/>
                { children }
            </Container>
            </body>
            </html>
    );
}
