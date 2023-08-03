'use client';
import Nav from '@/app/components/Nav';
import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Form from '@/app/add/components/Form';

export default function Add() {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center" alignItems="center"
			     flexDirection="column">
				<Typography fontFamily="Montserrat" fontSize={ 18 }>Add new word</Typography>
				<Form/>
			</Box>
		</Container>
	);
};