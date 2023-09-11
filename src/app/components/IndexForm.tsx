'use client';
import { Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { setCookie } from 'cookies-next';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContextProvider';
import { checkSecrets } from '@/utils/checkCredentials';
import AlertModal from '@/app/components/AlertModal';
import { AlertTimeout } from '@/config/AlertTimeout';
import { ModalDataType, ModalType } from '@/types';
import { fetchCategories } from '@/utils/fetchCategories';

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
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [isFetching, setIsFetching] = useState(false);
	const [modalData, setModalData] = useState<ModalDataType>({ message: '', type: 'success' });

	const [secret, setSecret] = useState('');
	const [dbId, setDbId] = useState('');
	const [pageId, setPageId] = useState('');
	const [dbName, setDbName] = useState('');

	const handleLogin = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await checkSecrets({ secret, database_id: dbId });
			if(res) {
				const credentials = { secret, database_id: dbId };
				const { properties: categories } = await fetchCategories(credentials);
				setCookie('categories', JSON.stringify(categories));
				setCookie('credentials', JSON.stringify(credentials));
				setSecret('');
				setDbId('');
				setAuthState({ loading: false, loggedIn: true });
				handleShowModal("You have logged in", "success");
			} else {
				throw new Error('Something went wrong. Try again...');
			}
		} catch(e: any) {
			const error = e as Error;
			handleShowModal(error.message, "error");
		} finally {
			setIsFetching(false);
		}
	};

	const handleCreateDatabase = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await fetch('https://notlex-api.vercel.app/create-database', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ secret, pageId, dbName })
			});

			if(res.ok) {
				const data = await res.json();
				const credentials = { secret, database_id: data.databaseId };
				setCookie('credentials', JSON.stringify(credentials));
				setSecret('');
				setPageId('');
				setDbName('');
				setAuthState({ loading: false, loggedIn: true });
				handleShowModal("You've created your database and logged in", "success");
			} else {
				throw new Error('Something went wrong. Try again...');
			}
		} catch(e: any) {
			const error = e as Error;
			handleShowModal(error.message, "error");
		} finally {
			setIsFetching(false);
		}
	};

	const handleShowModal = (message: string, type: ModalType) => {
		setModalData({ message, type });
		setTimeout(() => {
			setModalData({ message: '', type });
		}, AlertTimeout)
	}

	return (
		<>
			{ modalData.message && (
				<AlertModal handleClickModal={ () => setModalData({ message: '', type: 'success' }) } modalData={ modalData }/>
			) }
			<Typography
				fontFamily="Montserrat"
				fontWeight={ 700 }
				fontSize="18px"
			>
				{ isLoginForm ? 'Log in your account' : 'Create your own database' }
			</Typography>
			<FormControl sx={ { mt: '25px', width: '310px' } } fullWidth component="form"
			             onSubmit={ isLoginForm ? handleLogin : handleCreateDatabase }>
				<FormInput
					placeholder="SECRET KEY"
					type="text"
					required
					value={ secret }
					onChange={ e => setSecret(e.target.value) }
				/>
				{ isLoginForm ? (
					<FormInput
						placeholder="DATABASE ID"
						type="text"
						required
						value={ dbId }
						onChange={ e => setDbId(e.target.value) }
					/>
				) : (
					<>
						<FormInput
							placeholder="PAGE ID"
							type="text"
							required
							value={ pageId }
							onChange={ e => setPageId(e.target.value) }
						/>
						<FormInput
							placeholder="DATABASE NAME"
							type="text"
							required
							value={ dbName }
							onChange={ e => setDbName(e.target.value) }
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
					{ isLoginForm ? 'Don\'t have a database. Click to create' : 'Already have the database. Log in' }
				</Typography>
			</FormControl>
		</>
	);
}