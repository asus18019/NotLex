'use client';
import Nav from '@/app/components/Nav';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ProgramsWrapper from '@/app/dashboard/components/ProgramsWrapper';

export default function Dashboard() {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<Container maxWidth="lg" sx={ { overflow: 'hidden', px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<ProgramsWrapper/>
		</Container>
	);
};