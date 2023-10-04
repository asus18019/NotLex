'use client';
import { Container } from '@mui/material';
import '../styles/globals.css';
import Nav from '@/app/components/Nav';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AuthContextProvider from '@/context/AuthContextProvider';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	const { width } = useWindowSize();
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(width > 900);
	}, [width]);

	return (
		<html lang="en">
		<body>
		<SimpleBar style={ { maxHeight: '100vh' } }>
			<AuthContextProvider>
				<Container maxWidth="lg">
					<Nav showMenu={ showMenu } setShowMenu={ () => width < 900 && setShowMenu(!showMenu) }/>
					{ children }
				</Container>
			</AuthContextProvider>
		</SimpleBar>
		<Analytics/>
		</body>
		</html>
	);
}
