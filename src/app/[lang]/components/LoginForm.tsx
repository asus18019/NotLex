import { useContext } from 'react';
import { setCookie } from 'cookies-next';
import { Button, FormControl, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREDENTIALS_COOKIES_MAX_AGE } from '@/config/cookies';
import { getMe } from '@/utils/getMe';
import CircularProgress from '@mui/material/CircularProgress';
import { FormInput } from '@/app/[lang]/components/IndexFormContainer';
import { LoginSchema, LoginSchemaType } from '@/types/schemas';
import { useAlertModal } from '@/hooks/useAlertModal';
import { useSettings } from '@/hooks/useSettings';
import { useCategories } from '@/hooks/useCategories';
import { ErrorText } from '@/ui/text';
import { AuthContext } from '@/context/AuthContextProvider';

const LoginForm = () => {
	const { alertModal, handleShowModal } = useAlertModal();
	const { setAuthState } = useContext(AuthContext);
	const { setWordsPerCrossword } = useSettings();
	const { syncCategories } = useCategories();

	const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema)
	});

	const handleLogin = async (data: LoginSchemaType) => {
		try {
			const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			const { accessToken = '', message } = await res.json();

			if(!res.ok) {
				const errorMessage = message || 'Something went wrong. Try again...';
				throw new Error(errorMessage);
			}

			await initializeUserSession(accessToken);

			reset();
			handleShowModal('You have logged in', 'success');
		} catch(e: any) {
			const error = e as Error;
			console.log(error);
			handleShowModal(error.message, 'error');
		}
	};

	const initializeUserSession = async (accessToken: string) => {
		setAuthState({ loading: false, loggedIn: true });
		setWordsPerCrossword(10);
		setCookie('tokens', JSON.stringify({ accessToken }), { maxAge: CREDENTIALS_COOKIES_MAX_AGE });

		const getMeResponse = await getMe(accessToken);
		const { categoriesHash } = await getMeResponse.json();
		await syncCategories(categoriesHash, { token: accessToken });
	}

	return (
		<FormControl sx={ { mt: '25px', width: '310px' } } fullWidth component="form" onSubmit={ handleSubmit(handleLogin) }>
			{ alertModal }
			<FormInput
				{ ...register("email") }
				placeholder="Email"
			/>
			{ errors.email && <ErrorText>{ errors.email.message }</ErrorText> }

			<FormInput
				{ ...register("password") }
				placeholder="Password"
				type="password"
			/>
			{ errors.password && <ErrorText>{ errors.password.message }</ErrorText> }

			<Button sx={ { mt: '25px' } } variant="contained" type="submit" fullWidth disabled={ isSubmitting }>
				{ isSubmitting ? (
					<CircularProgress size={ 24 }/>
				) : (
					<Typography fontFamily="Montserrat">Submit</Typography>
				) }
			</Button>
		</FormControl>
	);
};

export default LoginForm;