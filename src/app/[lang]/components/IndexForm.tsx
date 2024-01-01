'use client';
import { Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { setCookie } from 'cookies-next';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';
// import { checkSecrets } from '@/utils/checkCredentials';
import { useCategories } from '@/hooks/useCategories';
import { useAlertModal } from '@/hooks/useAlertModal';
import { CREDENTIALS_COOKIES_MAX_AGE } from '@/config/cookies';
import { useSettings } from '@/hooks/useSettings';
import { getMe } from '@/utils/getMe';

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
	marginTop: '10px',
	':first-of-type': {
		marginTop: 0
	}
});

export default function IndexForm() {
	const { setAuthState } = useContext(AuthContext);
	const { syncCategories } = useCategories();
	const { setWordsPerCrossword } = useSettings();
	const { alertModal, handleShowModal } = useAlertModal();
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [isFetching, setIsFetching] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleLogin = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const { accessToken, message } = await res.json();

			if(!res.ok) {
				const errorMessage = message || 'Something went wrong. Try again...';
				throw new Error(errorMessage);
			}

			setWordsPerCrossword(10);
			setCookie('tokens', JSON.stringify({ accessToken }), { maxAge: CREDENTIALS_COOKIES_MAX_AGE });

			const getMeResponse = await getMe(accessToken);
			const { categoriesHash } = await getMeResponse.json();
			await syncCategories(categoriesHash, { token: accessToken });

			setEmail('');
			setPassword('');
			setAuthState({ loading: false, loggedIn: true });
			handleShowModal('You have logged in', 'success');
		} catch(e: any) {
			const error = e as Error;
			console.log(error);
			handleShowModal(error.message, 'error');
		} finally {
			setIsFetching(false);
		}
	};

	const handleRegister = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/registerAccount`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, firstName, lastName })
			});

			const data = await res.json();
			if(res.ok) {
				setEmail('');
				setPassword('');
				setFirstName('');
				setLastName('');
				setIsLoginForm(!isLoginForm);
				handleShowModal('Check and confirm your email...', 'success', 10000);
			} else {
				const message = data.message || 'Something went wrong. Try again...';
				throw new Error(message);
			}
		} catch(e: any) {
			const error = e as Error;
			handleShowModal(error.message, 'error');
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<>
			{ alertModal }
			<Typography
				fontFamily="Montserrat"
				fontWeight={ 700 }
				fontSize="18px"
			>
				{ isLoginForm ? 'Log in your account' : 'Register your account' }
			</Typography>
			<FormControl sx={ { mt: '25px', width: '310px' } } fullWidth component="form"
			             onSubmit={ isLoginForm ? handleLogin : handleRegister }>
				<FormInput
					placeholder="Email"
					type="email"
					required
					value={ email }
					onChange={ e => setEmail(e.target.value) }
				/>

				<FormInput
					placeholder="Password"
					type="password"
					required
					value={ password }
					onChange={ e => setPassword(e.target.value) }
				/>
				{ !isLoginForm && (
					<>
						<FormInput
							placeholder="First Name"
							type="text"
							value={ firstName }
							onChange={ e => setFirstName(e.target.value) }
						/>
						<FormInput
							placeholder="Last Name"
							type="text"
							value={ lastName }
							onChange={ e => setLastName(e.target.value) }
						/>
					</>
				) }
				<Button sx={ { mt: '25px' } } variant="contained" type="submit" fullWidth
				        disabled={ isFetching }>
					{ isFetching ? (
						<CircularProgress size={ 24 }/>
					) : (
						<Typography fontFamily="Montserrat">Submit</Typography>
					) }
				</Button>

				<Typography
					onClick={ () => setIsLoginForm(!isLoginForm) }
					component="a"
					sx={ {
						cursor: 'pointer',
						textDecoration: 'underline',
						mt: '14px',
						color: '#0000008c'
					} }
					fontFamily="Montserrat"
				>
					{ isLoginForm ? 'Don\'t have an account ? Click to create' : 'Already have an account ? Log in' }
				</Typography>
			</FormControl>
		</>
	);
}