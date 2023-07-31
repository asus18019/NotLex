import {
	Box,
	Container,
	Paper,
	Typography
} from '@mui/material';
import Head from 'next/head';
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { SettingsInput } from '@/components/UI/SettingsInput';
import Link from 'next/link';
import Cookies from 'js-cookie';

export const Settings = () => {
	const [showMenu, setShowMenu] = useState(false);

	const [secretKey, setSecretKey] = useState('');
	const [showSecretKey, setShowSecretKey] = useState(false);
	const [databaseId, setDatabaseId] = useState('');
	const [showDatabaseId, setShowDatabaseId] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	useEffect(() => {
		const credentials = Cookies.get('credentials');
		if(!credentials) return;
		const { secret, database_id } = JSON.parse(credentials);
		setSecretKey(secret);
		setDatabaseId(database_id);
	}, []);

	return (
		<>
			<Head>
				<title>NotLex | Settings</title>
			</Head>
			<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
				<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
				<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center"
				     alignItems="center">
					<Paper variant="elevation" elevation={ 4 } sx={ {
						display: 'flex',
						alignSelf: 'center',
						flexDirection: 'column',
						p: { xs: '15px', md: '30px' },
						width: '550px'
					} }>
						<Typography fontFamily="Montserrat" fontWeight="600" fontSize={ 20 } textAlign="center">Account
							settings</Typography>
						<Box display="flex" justifyContent="space-between" marginTop="30px">
							<Typography fontFamily="Montserrat" fontWeight="400" fontSize={ 15 }  alignSelf='center'>SECRET_KEY</Typography>
							{ secretKey ? (
								<SettingsInput
									value={ secretKey }
									showPassword={ showSecretKey }
									handleClickShowPassword={ () => setShowSecretKey(show => !show) }
									handleMouseDownPassword={ e => e.preventDefault() }
								/>
							) : (
								<div>Not found</div>
							) }
						</Box>
						<Box display="flex" justifyContent="space-between" marginTop="8px">
							<Typography fontFamily="Montserrat" fontWeight="400" fontSize={ 15 } alignSelf='center'>DATABASE_ID</Typography>
							{ databaseId.length ? (
								<SettingsInput
									value={ databaseId }
									showPassword={ showDatabaseId }
									handleClickShowPassword={ () => setShowDatabaseId(show => !show) }
									handleMouseDownPassword={ e => e.preventDefault() }
								/>
							) : (
								<div>Not found</div>
							) }
						</Box>
						<Typography fontFamily="Montserrat" color="rgba(0,0,0,0.55)" fontWeight="400" fontSize={ 14 }
						            mt="20px">
							You can use your secrets to log in into your account on another device or browser.
							All of them are stored in your browser&apos;s cookies. If you want to update them, simply log in
							again on the <Link href="/">Home</Link> page.
						</Typography>
					</Paper>
				</Box>
			</Container>
		</>
	);
};

export default Settings;