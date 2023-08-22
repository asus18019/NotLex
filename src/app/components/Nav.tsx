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

	const mobileNavbarHeight = (showMenu && !loading) ? (loggedIn ? '287px' : '179px') : '0px';

	const closeMenuIcon = (
		<CloseIcon
			cursor="pointer"
			onClick={ setShowMenu }
			sx={ {
				display: { md: 'none' },
				position: 'absolute',
				right: '14px',
				top: '14px',
				fontSize: 30
			} }
		/>
	);

	const openMenuIcon = (
		<MenuIcon
			cursor="pointer"
			onClick={ setShowMenu }
			sx={ {
				display: { md: 'none' },
				position: 'absolute',
				right: '16px',
				top: '16px'
			} }
		/>
	);

	return (
		<>
			<Toolbar
				component="nav"
				variant="dense"
				sx={ {
					width: { md: 'auto' },
					height: { xs: mobileNavbarHeight, md: 'auto' },
					justifyContent: 'space-between',
					py: 1,
					textAlign: 'center',
					overflow: 'hidden',
					transition: 'all 0.25s ease-in-out',
					position: 'relative'
				} }
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					position={ { xs: showMenu ? 'absolute' : 'static', md: 'static' } }
					sx={ {
						transform: { xs: showMenu ? 'translateY(-250px)' : 'none', md: 'none' },
						transition: 'all 0.25s ease-in-out'
					} }
					top={ 0 }
				>
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
					{ showMenu ? closeMenuIcon : openMenuIcon }
					{ showMenu && (
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
