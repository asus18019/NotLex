import { Backdrop, Box, Modal as ModalComponent, styled } from '@mui/material';
import { ReactNode } from 'react';

const ModalContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	backgroundColor: 'white',
	borderRadius: '4px',
	padding: '32px',
	[theme.breakpoints.down('md')]: {
		width: '88%',
		padding: '32px 16px',
	}
}));

interface ModalProps {
	isOpen: boolean,
	toggleModal: () => void,
	children: ReactNode
}

const Modal = ({ isOpen, toggleModal, children }: ModalProps) => {
	return (
		<ModalComponent
			open={ isOpen }
			onClose={ toggleModal }
			closeAfterTransition
			slots={ { backdrop: Backdrop } }
		>
			<ModalContainer>
				{ children }
			</ModalContainer>
		</ModalComponent>
	);
};

export default Modal;