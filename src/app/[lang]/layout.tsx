'use client';
import { Container } from '@mui/material';
import '../../styles/globals.css';
import Nav from '@/app/[lang]/components/Nav';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AuthContextProvider from '@/context/AuthContextProvider';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Locale } from '../../../i18n.config';
import LangContextProvider from '@/context/LangContextProvider';

export default function RootLayout({
	children,
	params
}: {
	children: ReactNode,
	params: { lang: Locale }
}) {
	const { width } = useWindowSize();
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(width > 900);
	}, [width]);

	return (
		<html lang={ params.lang }>
		<body>
		<SimpleBar style={ { maxHeight: '100vh' } }>
			<AuthContextProvider>
				<LangContextProvider lang={ params.lang }>
					<Container maxWidth="lg">
						<Nav
							showMenu={ showMenu }
							setShowMenu={ () => width < 900 && setShowMenu(!showMenu) }
						/>
						{ children }
					</Container>
				</LangContextProvider>
			</AuthContextProvider>
		</SimpleBar>
		<Analytics/>
		</body>
		</html>
	);
}
