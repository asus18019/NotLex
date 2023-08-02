import Link from 'next/link';
import { Toolbar, styled, Divider, Typography, Box } from '@mui/material';
import Logo from '@/svg/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
		title: 'Add word',
		url: '/add'
	},
	{
		title: 'Settings',
		url: '/settings'
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
	'@media (max-width:900px)': {
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 600,
		margin: '8px 18px',
	},
	cursor: 'pointer'
});

export default function Nav({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: () => void }) {
	return (
		<>
			<Toolbar
				component="nav"
				variant="dense"
				sx={ {
					width: { md: 'auto' },
					height: { md: 'auto' },
					justifyContent: 'space-between',
					py: 1,
					textAlign: 'center'
				} }
			>
				<Box display={{ xs: showMenu ? 'none' : 'flex', md: 'flex' }} justifyContent="center" alignItems="center">
					<Logo/>
					<Typography sx={ { cursor: 'pointer' } } marginLeft={ 1 } fontFamily="Titillium Web"
					            fontSize="26px">NotLex</Typography>
				</Box>
				<Box display="flex" flexDirection={ { xs: 'column', md: 'row' } } width={{ xs: '100%', md: 'auto' }}>
					{ showMenu && <CloseIcon cursor="pointer" onClick={ setShowMenu } fontSize='large' sx={{ display: { md: 'none' } }} /> }
					{
						!showMenu ? <MenuIcon sx={{ display: { xs: 'flex', md: 'none' }, alignSelf: 'flex-end' }} cursor="pointer" onClick={ setShowMenu }/> : (
							sections.map((section) => (
								<NavbarLink key={ section.title } href={ section.url }>{ section.title }</NavbarLink>
							)))
					}
				</Box>
			</Toolbar>
			<Divider/>
		</>
	);
}
