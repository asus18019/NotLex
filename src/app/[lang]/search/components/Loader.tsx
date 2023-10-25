import CircularProgress from '@mui/material/CircularProgress';
import { LoadingText } from '@/app/[lang]/dashboard/components/Repeat';
import { Box } from '@mui/material';

export default function Loader() {
	return (
		<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
			<CircularProgress size={ 50 }/>
			<LoadingText fontSize={ { xs: 17, md: 17 } }>Looking for your words...</LoadingText>
		</Box>
	);
}