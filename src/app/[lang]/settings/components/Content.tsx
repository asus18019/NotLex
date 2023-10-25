'use client';
import { Box, Button, Paper, styled, Typography } from '@mui/material';
import { Input } from '@/app/[lang]/settings/components/Input';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useCredentials } from '@/hooks/useCredentials';
import Modal from '@/app/[lang]/components/Modal';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContextProvider';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';

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

const StyledButton = styled(Button)({
	marginTop: '20px',
	fontWeight: 600,
	fontFamily: 'Montserrat'
});

export default function Content() {
	const { lang } = useContext(LangContext);
	const { page, navigation } = getDictionary(lang);
	const router = useRouter();
	const { setAuthState } = useContext(AuthContext);
	const [secret, databaseId] = useCredentials();

	const [showSecretKey, setShowSecretKey] = useState(false);
	const [showDatabaseId, setShowDatabaseId] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const handleSignOut = () => {
		deleteCookie('credentials');
		router.push(`/${ lang }/`);
		setAuthState({ loading: false, loggedIn: false });
	}

	return (
		<PaperWrapper variant="elevation" elevation={ 4 }>
			<Modal isOpen={ isModalOpen } toggleModal={ toggleModal }>
				<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
					<Typography fontFamily="Montserrat" fontWeight="500" fontSize={ 18 }>{ page.settings.modal.title }</Typography>
					<Box display="flex" width="100%" gap="16px">
						<StyledButton fullWidth color="error" variant="outlined" onClick={ handleSignOut }>{ page.settings.modal.submit }</StyledButton>
						<StyledButton fullWidth variant="outlined" onClick={ toggleModal }>{ page.settings.modal.cancel }</StyledButton>
					</Box>
				</Box>
			</Modal>
			<Typography fontFamily="Montserrat" fontWeight="600" fontSize={ 20 } textAlign="center">{ page.settings.title }</Typography>
			<Box display="flex" justifyContent="space-between" marginTop="30px">
				<Typography fontFamily="Montserrat" fontWeight="400" fontSize={ 15 }
				            alignSelf="center">SECRET_KEY</Typography>
				{ secret ? (
					<Input
						value={ secret }
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
				{ databaseId ? (
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
			<StyledButton variant="outlined" color="error" onClick={ toggleModal }>{ page.settings.signOutBtn }</StyledButton>
			<Typography fontFamily="Montserrat" color="rgba(0,0,0,0.55)" fontWeight="400" fontSize={ 14 } mt="20px">
				{ page.settings.credentialsInfo1 + ' ' }
				<Link href={ `/${ lang }/` }>{ navigation.home }</Link>
				{ ' ' + page.settings.credentialsInfo2 }
			</Typography>
		</PaperWrapper>
	);
};