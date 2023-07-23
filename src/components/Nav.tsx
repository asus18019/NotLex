import Link from 'next/link';
import { Toolbar, styled, Divider, Typography, Box } from '@mui/material';
import Head from 'next/head';
import Logo from '@/svg/Logo';

const sections = [
	{
		title: 'Home',
		url: '/'
	},
	{
		title: 'Dashboard',
		url: '/dashboard'
	},
	{
		title: 'Find word',
		url: '/search'
	},
	{
		title: 'About',
		url: '/about'
	},
	{
		title: 'Donate',
		url: '/donate'
	}
];

const NavbarLink = styled(Link)({
	margin: '10px 18px',
	textDecoration: 'none',
	fontFamily: 'Inter',
	fontSize: '16px',
	color: '#00000099',
	':hover': {
		color: '#000000'
	},
	cursor: 'pointer'
});

export default function Nav() {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Montserrat:wght@500;600;700&family=Titillium+Web:wght@600&display=swap" rel="stylesheet"/>		</Head>
			<Toolbar
				component="nav"
				variant="dense"
				sx={ { justifyContent: 'space-between', overflowX: 'auto', py: 1 } }
			>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Logo/>
					<Typography sx={ { cursor: 'pointer' } } marginLeft={ 1 } fontFamily="Titillium Web"
					            fontSize="26px">NotLex</Typography>
				</Box>
				<Box>
					{ sections.map((section) => (
						<NavbarLink key={section.title} href={ section.url }>{ section.title }</NavbarLink>
					)) }
				</Box>
			</Toolbar>
			<Divider/>
		</>
	);
}
