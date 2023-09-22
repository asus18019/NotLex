import { Alert, Box, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalDataType } from '@/types';

const AlertWindow = styled(Alert)(({ theme }) => ({
	cursor: 'pointer',
	padding: '4px 16px',
	position: 'fixed',
	top: 30,
	left: 10,
	right: 10,
	bottom: 'auto',
	zIndex: 999,
	[theme.breakpoints.up('md')]: {
		top: 'auto',
		left: 'auto',
		right: 30,
		bottom: 30
	},
	'& .MuiAlert-message': {
		width: '100%'
	},
}));


interface AlertModalProps {
	modalData: ModalDataType,
	handleClickModal: () => void,
	timeout: number
}

const AlertModal = ({ modalData, handleClickModal, timeout }: AlertModalProps) => {
	const [lineWidth, setLineWidth] = useState('100%');

	useEffect(() => {
		setLineWidth('0%');

	}, [modalData.message]);

	return (
		<AlertWindow onClick={ handleClickModal } severity={ modalData.type }>
			<Box
				height="2px"
				bgcolor="blue"
				sx={ {
					width: lineWidth,
					transitionDuration: `${ timeout / 1000 }s`
				} }
			/>
			<Typography fontWeight={ 500 }>{ modalData.message }</Typography>
		</AlertWindow>
	);
};

export default AlertModal;