import { Box, Typography } from '@mui/material';
import Form from '@/app/add/components/Form';

export default function Add() {
	return (
		<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center" alignItems="center"
		     flexDirection="column">
			<Typography fontFamily="Montserrat" fontSize={ 18 }>Add new word</Typography>
			<Form/>
		</Box>
	);
};