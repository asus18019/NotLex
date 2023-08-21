"use client";
import { Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { setCookie } from 'cookies-next';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';

const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '14px',
	outline: 'none',
	padding: '8px 16px',
	borderRadius: '6px',
	// width: '320px',
	color: 'rgba(0,0,0,0.55)',
	border: '1px solid gray',
	':nth-of-type(2n)': {
		marginTop: '10px'
	}
});

export default function IndexForm() {
	const { setAuthState } = useContext(AuthContext);
	const [isFetching, setIsFetching] = useState(false);

	const [secret, setSecret] = useState('');
	const [dbId, setDbId] = useState('');

	const handleLogin = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await fetch('https://notlex-api.vercel.app/check-secrets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ secret: secret, database_id: dbId })
			});

			if(res.ok) {
				const credentials = { secret, database_id: dbId };
				setCookie('credentials', JSON.stringify(credentials));
				setSecret('');
				setDbId('');
				setAuthState({ loading: false, loggedIn: true })
			} else {
				console.log('something went wrong');
			}
		} catch(e) {
			console.log(e);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<FormControl sx={ { mt: '25px', width: '310px' } } fullWidth component="form" onSubmit={ handleLogin }>
			<FormInput placeholder="SECRET KEY" type="text" required value={ secret }
			           onChange={ e => setSecret(e.target.value) }/>
			<FormInput placeholder="DATABASE ID" type="text" required value={ dbId }
			           onChange={ e => setDbId(e.target.value) }/>
			<Button sx={ { mt: '25px' } } variant="contained" type="submit" fullWidth disabled={ isFetching }>
				{ isFetching ? (
					<CircularProgress size={ 24 }/>
				) : (
					<Typography fontFamily="Montserrat">Submit</Typography>
				) }
			</Button>
		</FormControl>
	);
}