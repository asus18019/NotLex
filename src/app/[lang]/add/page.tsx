import { Box, Typography } from '@mui/material';
import Form from '@/app/[lang]/add/components/Form';
import { Metadata } from 'next';
import { ServerComponentPropsType } from '@/types';

export const metadata: Metadata = {
	title: 'Add | NotLex',
	description: 'Add a new word to your Notion database using NotLex',
}

export default function Add({ searchParams }: ServerComponentPropsType) {
	return (
		<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center" alignItems="center"
		     flexDirection="column">
			<Typography fontFamily="Montserrat" fontSize={ 18 }>Add new word</Typography>
			<Form searchParams={ searchParams }/>
		</Box>
	);
};