import Link from 'next/link';
import { Toolbar, styled, Divider, Typography, Box, CircularProgress } from '@mui/material';
import Logo from '@/svg/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';
import { useCredentials } from '@/hooks/useCredentials';
import { checkSecrets } from '@/utils/checkCredentials';
import { navLinks } from '@/config/links';
import { useCategories } from '@/hooks/useCategories';

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

export default function Nav({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: () => void }) {
	const router = useRouter();
	const [secret, database_id] = useCredentials();
	const { syncCategories } = useCategories();
	const { loading, loggedIn, setAuthState } = useContext(AuthContext);

	useLayoutEffect(() => {
		checkSecrets({ secret, database_id })
			.then(async res => {
				setAuthState({ loading: false, loggedIn: res.ok });

				const { categoriesHash } = await res.json();
				await syncCategories(categoriesHash);
			})
			.catch(() => {
				setAuthState({ loading: false, loggedIn: false });
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
					transition: '0.3s',
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
						transition: '0.3s'
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
							navLinks.map((section) => {
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
