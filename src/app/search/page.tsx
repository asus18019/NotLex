'use client';
import { Container, Typography } from '@mui/material';
import Nav from '@/app/components/Nav';
import { useEffect, useState } from 'react';
import SearchForm from '@/app/search/components/SearchForm';

export default function Search() {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>
				Enter the word you want to find...
			</Typography>
			<SearchForm/>
		</Container>
	);
};