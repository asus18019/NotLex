'use client';
import AlertModal from '@/app/[lang]/components/AlertModal';
import { useRef, useState } from 'react';
import { ModalDataType, ModalType } from '@/types';
import { AlertTimeout as DefaultAlertTimeout } from '@/config/AlertTimeout';

export const useAlertModal = () => {
	const closeTimeoutFn = useRef<NodeJS.Timeout | undefined>();
	const [modalData, setModalData] = useState<ModalDataType>({ message: '', type: 'success' });
	const [alertTimeout, setAlertTimeout] = useState<number>(DefaultAlertTimeout);

	const handleShowModal = (message: string, type: ModalType, timeout = DefaultAlertTimeout) => {
		setAlertTimeout(timeout);
		setModalData({ message, type });
		closeTimeoutFn.current = setTimeout(() => {
			closeModal();
		}, timeout);
	};

	const closeModal = () => {
		setModalData({ message: '', type: 'success' });
		clearTimeout(closeTimeoutFn.current);
	};

	const alertModal = modalData.message && (
		<AlertModal handleClickModal={ closeModal } modalData={ modalData } timeout={ alertTimeout }/>
	);

	return {
		alertModal,
		handleShowModal
	};
};