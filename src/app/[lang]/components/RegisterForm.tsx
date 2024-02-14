import { Button, FormControl, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FormInput } from '@/app/[lang]/components/IndexFormContainer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '@/types/schemas';
import { useAlertModal } from '@/hooks/useAlertModal';
import { ErrorText } from '@/ui/text';

const RegisterForm = () => {
	const { alertModal, handleShowModal } = useAlertModal();

	const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema)
	});

	const handleRegister = async (registerData: RegisterSchemaType) => {
		try {
			const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/registerAccount`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(registerData)
			});

			const data = await res.json();

			if(!res.ok) {
				const message = data.message || 'Something went wrong. Try again...';
				throw new Error(message);
			}

			reset();
			handleShowModal('Check and confirm your email...', 'success', 10000);
		} catch(e: any) {
			const error = e as Error;
			handleShowModal(error.message, 'error');
		}
	};

	return (
		<FormControl sx={ { mt: '25px', width: '310px' } } fullWidth component="form" onSubmit={ handleSubmit(handleRegister) }>
			{ alertModal }
			<FormInput
				{ ...register("firstName") }
				placeholder="First name (optional)"
			/>
			{ errors.firstName && <ErrorText>{ errors.firstName.message }</ErrorText> }

			<FormInput
				{ ...register("lastName") }
				placeholder="Last name (optional)"
			/>
			{ errors.lastName && <ErrorText>{ errors.lastName.message }</ErrorText> }

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

			<FormInput
				{ ...register("confirmPassword") }
				placeholder="Confirm password"
				type="password"
			/>
			{ errors.confirmPassword && <ErrorText>{ errors.confirmPassword.message }</ErrorText> }

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

export default RegisterForm;