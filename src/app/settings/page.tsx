'use client';
import { Box } from '@mui/material';
import Content from '@/app/settings/components/Content';

export default function Settings() {
	return (
		<Box width="100%" height="calc(100vh - 81px)" display="flex" justifyContent="center"
		     alignItems="center">
			<Content/>
		</Box>
	);
};