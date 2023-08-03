import { Box, Paper, styled, Typography } from '@mui/material';
import { Input } from '@/app/settings/components/Input';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PaperWrapper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	alignSelf: 'center',
	flexDirection: 'column',
	padding: '15px',
	width: '550px',
	[theme.breakpoints.up('md')]: {
		padding: '30px'
	}
}));

export default function Content() {
	const [secretKey, setSecretKey] = useState('');
	const [showSecretKey, setShowSecretKey] = useState(false);
	const [databaseId, setDatabaseId] = useState('');
	const [showDatabaseId, setShowDatabaseId] = useState(false);

	useEffect(() => {
		const credentials = Cookies.get('credentials');
		if(!credentials) return;
		const { secret, database_id } = JSON.parse(credentials);
		setSecretKey(secret);
		setDatabaseId(database_id);
	}, []);

	return (
		<PaperWrapper variant="elevation" elevation={ 4 }>
			<Typography fontFamily="Montserrat" fontWeight="600" fontSize={ 20 } textAlign="center">Account
				settings</Typography>
			<Box display="flex" justifyContent="space-between" marginTop="30px">
				<Typography fontFamily="Montserrat" fontWeight="400" fontSize={ 15 }
				            alignSelf="center">SECRET_KEY</Typography>
				{ secretKey ? (
					<Input
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
				<Typography fontFamily="Montserrat" fontWeight="400" fontSize={ 15 }
				            alignSelf="center">DATABASE_ID</Typography>
				{ databaseId.length ? (
					<Input
						value={ databaseId }
						showPassword={ showDatabaseId }
						handleClickShowPassword={ () => setShowDatabaseId(show => !show) }
						handleMouseDownPassword={ e => e.preventDefault() }
					/>
				) : (
					<div>Not found</div>
				) }
			</Box>
			<Typography fontFamily="Montserrat" color="rgba(0,0,0,0.55)" fontWeight="400" fontSize={ 14 } mt="20px">
				You can use your secrets to log in into your account on another device or browser.
				All of them are stored in your browser&apos;s cookies. If you want to update them, simply log in
				again on the <Link href="/">Home</Link> page.
			</Typography>
		</PaperWrapper>
	);
};