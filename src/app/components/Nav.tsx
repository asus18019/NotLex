import Link from 'next/link';
import { Toolbar, styled, Divider, Typography, Box, CircularProgress } from '@mui/material';
import Logo from '@/svg/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';
import { CredentialsType } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';

const links = [
	{
		title: 'Home',
		url: '/',
		private: false
	},
	{
		title: 'Dashboard',
		url: '/dashboard',
		private: true
	},
	{
		title: 'Find word',
		url: '/search',
		private: false
	},
	{
		title: 'Add word',
		url: '/add',
		private: true
	},
	{
		title: 'Settings',
		url: '/settings',
		private: true
	},
	{
		title: 'About',
		url: '/about',
		private: false
	},
	{
		title: 'Donate',
		url: '/donate',
		private: false
	}
];

const NavbarLink = styled(Link)(({ theme }) => ({
	margin: '10px 18px',
	textDecoration: 'none',
	fontFamily: 'Inter',
	fontSize: '16px',
	color: '#00000099',
	cursor: 'pointer',
	':hover': {
		color: '#000000'
	},
	[theme.breakpoints.down('md')]: {
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 600,
		margin: '8px 18px'
	}
}));

const checkSecrets = async ({ secret, database_id }: CredentialsType): Promise<boolean> => {
	const res = await fetch('https://notlex-api.vercel.app/check-secrets', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ secret: secret, database_id })
	});

	return res.ok;
};

export default function Nav({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: () => void }) {
	const router = useRouter();
	const [secret, database_id] = useCredentials();
	const { loading, loggedIn, setAuthState } = useContext(AuthContext);

	useEffect(() => {
		checkSecrets({ secret, database_id })
			.then(isValid => {
				setAuthState({ loading: false, loggedIn: isValid });
			})
			.catch(() => {
				console.log('Something went wrong');
			});
	}, []);

	const goToMain = () => router.push('/');

	const showCloseMenuIcon = showMenu && (
		<CloseIcon
			cursor="pointer"
			onClick={ setShowMenu }
			fontSize="large"
			sx={ { display: { md: 'none' } } }
		/>
	)

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
				<Box display={ { xs: showMenu ? 'none' : 'flex', md: 'flex' } } justifyContent="center"
				     alignItems="center">
					<Logo onClick={ goToMain }/>
					<Typography
						sx={ { cursor: 'pointer' } }
						marginLeft={ 1 }
						fontFamily="Titillium Web"
						fontSize="26px"
						onClick={ goToMain }
					>
						NotLex
					</Typography>
				</Box>
				<Box display="flex" flexDirection={ { xs: 'column', md: 'row' } }
				     width={ { xs: '100%', md: 'auto' } }>
					{ showCloseMenuIcon }
					{ !showMenu ? (
						<MenuIcon sx={ { alignSelf: 'flex-end' } } cursor="pointer" onClick={ setShowMenu }/>
					) : (
						loading ? (
							<CircularProgress size={ 30 } sx={ { m: '10px auto' } }/>
						) : (
							links.map((section) => {
								if(!loggedIn && section.private) return;
								return (
									<NavbarLink
										key={ section.title }
										href={ section.url }
										onClick={ setShowMenu }
									>
										{ section.title }
									</NavbarLink>
								);
							})
						)
					)
					}
				</Box>
			</Toolbar>
			<Divider/>
		</>
	);
}
