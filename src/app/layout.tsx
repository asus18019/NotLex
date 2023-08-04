"use client"
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import { useEffect, useState, ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<html lang="en" className={inter.className}>
		<body>
		<Container maxWidth="lg" disableGutters>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			{ children }
		</Container>
		</body>
		</html>
	);
}
