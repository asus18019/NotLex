'use client';
import {
	Box,
	Container
} from '@mui/material';
import Nav from '@/app/components/Nav';
import { useEffect, useState } from 'react';
import Content from '@/app/settings/components/Content';

export default function Settings() {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center"
			     alignItems="center">
				<Content/>
			</Box>
		</Container>
	);
};