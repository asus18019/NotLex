import CircularProgress from '@mui/material/CircularProgress';
import { LoadingText } from '@/app/[lang]/dashboard/components/Repeat';
import { Box } from '@mui/material';
import { getDictionary } from '@/utils/dictionary';
import { useContext } from 'react';
import { LangContext } from '@/context/LangContextProvider';

export default function Loader() {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);

	return (
		<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
			<CircularProgress size={ 50 }/>
			<LoadingText fontSize={ { xs: 17, md: 17 } }>{ page.search.loader.text }</LoadingText>
		</Box>
	);
}