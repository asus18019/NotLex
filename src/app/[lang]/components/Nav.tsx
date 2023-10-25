import Link from 'next/link';
import { Toolbar, styled, Divider, Box, CircularProgress } from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';
import { useCredentials } from '@/hooks/useCredentials';
import { checkSecrets } from '@/utils/checkCredentials';
import { navLinks } from '@/config/links';
import { useCategories } from '@/hooks/useCategories';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '@/utils/dictionary';

const NavbarLink = styled(Link)(({ theme }) => ({
	margin: '3px 5px',
	padding: '7px 12px',
	textDecoration: 'none',
	fontFamily: 'Inter',
	fontSize: '16px',
	borderRadius: '30px',
	cursor: 'pointer',
	':hover': {
		color: '#000000'
	},
	[theme.breakpoints.down('md')]: {
		textAlign: 'center',
		fontSize: '20px',
		fontWeight: 600,
		margin: '0px 18px',
		padding: '7px 9px'
	}
}));

const LogoLink = styled(Link)({
	textDecoration: 'none',
	color: 'inherit',
	cursor: 'pointer',
	fontFamily: 'Titillium Web',
	fontSize: '26px',
	margin: '8px'
});

export default function Nav({ showMenu, setShowMenu, lang }: {
	showMenu: boolean,
	setShowMenu: () => void,
	lang: Locale
}) {
	const pathname = usePathname();
	const { navigation } = getDictionary(lang);

	const [secret, database_id] = useCredentials();
	const { syncCategories } = useCategories();
	const { loading, loggedIn, setAuthState } = useContext(AuthContext);
	const [hideMenu, setHideMenu] = useState(true);

	useEffect(() => {
		if(!showMenu) {
			setHideMenu(true);
		}
	}, [showMenu]);

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

	const closeMenuIcon = (
		<CloseIcon
			cursor="pointer"
			onClick={ () => {
				setShowMenu();
				setTimeout(() => {
					setHideMenu(true);
				}, 100);
			} }
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
			onClick={ () => {
				setHideMenu(false);
				setTimeout(() => {
					setShowMenu();
				}, 200);
			} }
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
					justifyContent: 'space-between',
					py: 1,
					textAlign: 'center'
				} }
			>
				<Box
					display={ { xs: !hideMenu ? 'none' : 'flex', md: 'flex' } }
					justifyContent="center"
				>
					<Link href="/">
						<Image src="./../logo.svg" alt="NotLex" height="45" width="45"/>
					</Link>
					<LogoLink href="/">NotLex</LogoLink>
				</Box>
				<Box display="flex" flexDirection={ { xs: 'column', md: 'row' } } width={ { xs: '100%', md: 'auto' } }>
					{ showMenu ? closeMenuIcon : openMenuIcon }
					{ showMenu && loading ? (
						<CircularProgress size={ 30 } sx={ { m: '10px auto' } }/>
					) : (
						<Box
							sx={ {
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
								transition: 'height 0.2s',
								height: { xs: !hideMenu ? '260px' : '0px', md: 'auto' },
								opacity: showMenu ? 1 : 0
							} }
						>{
							navLinks.map((section) => {
								if(!loggedIn && section.private) return;
								return (
									<NavbarLink
										key={ section.title }
										href={ section.url }
										onClick={ () => {
											setShowMenu();
											setHideMenu(true);
										} }
										sx={ {
											display: { xs: hideMenu ? 'none' : 'block', md: 'block' },
											border: `1px solid ${ section.url === pathname ? 'lightgray' : 'transparent' }`,
											color: section.url === pathname ? 'black' : '#00000099'
										} }
									>
										{ navigation[section.title.toLowerCase()] }
									</NavbarLink>
								);
							})
						}</Box>
					) }
				</Box>
			</Toolbar>
			<Divider/>
		</>
	);
}
