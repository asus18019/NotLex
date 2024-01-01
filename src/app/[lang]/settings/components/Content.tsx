'use client';
import { Box, Button, Paper, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useContext, useState } from 'react';
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

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const handleSignOut = () => {
		deleteCookie('tokens');
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
			<StyledButton variant="outlined" color="error" onClick={ toggleModal }>{ page.settings.signOutBtn }</StyledButton>
			<Typography fontFamily="Montserrat" color="rgba(0,0,0,0.55)" fontWeight="400" fontSize={ 14 } mt="20px">
				{ page.settings.credentialsInfo1 + ' ' }
				<Link href={ `/${ lang }/` }>{ navigation.home }</Link>
				{ ' ' + page.settings.credentialsInfo2 }
			</Typography>
		</PaperWrapper>
	);
};