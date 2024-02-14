'use client';
import { styled, Typography } from '@mui/material';
import { useState } from 'react';
import LoginForm from '@/app/[lang]/components/LoginForm';
import RegisterForm from '@/app/[lang]/components/RegisterForm';

export const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '14px',
	outline: 'none',
	padding: '8px 16px',
	borderRadius: '6px',
	color: 'rgba(0,0,0,0.55)',
	border: '1px solid gray',
	marginTop: '10px',
	':first-of-type': {
		marginTop: 0
	}
});

export default function IndexFormContainer() {
	const [isLoginForm, setIsLoginForm] = useState(true);

	return (
		<>
			<Typography
				fontFamily="Montserrat"
				fontWeight={ 700 }
				fontSize="18px"
			>
				{ isLoginForm ? 'Log in your account' : 'Register your account' }
			</Typography>

			{ isLoginForm ? <LoginForm/> : <RegisterForm/> }

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
		</>
	);
}