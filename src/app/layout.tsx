"use client"
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import { useEffect, useState, ReactNode } from 'react';

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
		<html lang="en">
		<body>
		<Container maxWidth="lg">
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			{ children }
		</Container>
		</body>
		</html>
	);
}
