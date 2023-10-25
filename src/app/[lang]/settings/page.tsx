import { Box } from '@mui/material';
import { Metadata } from 'next';
import Content from './components/Content';

export const metadata: Metadata = {
	title: 'Settings | NotLex',
	description: 'Configure your data',
}

export default function Settings() {
	return (
		<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center"
		     alignItems="center">
			<Content/>
		</Box>
	);
};