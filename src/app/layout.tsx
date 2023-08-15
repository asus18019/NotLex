"use client"
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import { useState, ReactNode } from 'react';

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
    const isMobileMenu = window.screen.width < 900;
	const [showMenu, setShowMenu] = useState(!isMobileMenu);

	return (
		<html lang="en">
		<body>
		<Container maxWidth="lg">
			<Nav showMenu={ showMenu } setShowMenu={ () => isMobileMenu && setShowMenu(!showMenu) }/>
			{ children }
		</Container>
		</body>
		</html>
	);
}
