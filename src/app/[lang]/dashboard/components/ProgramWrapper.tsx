import { ReactNode, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingText } from '@/app/[lang]/dashboard/components/Repeat';
import { CardData } from '@/types';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';

interface ProgramWrapperProps {
	isFetching: boolean,
	words: CardData[],
	children: ReactNode
}

const ProgramWrapper = ({ isFetching, words, children }: ProgramWrapperProps) => {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	return (
		<Box display="flex" justifyContent="center" minHeight="calc(100vh - 81px)" alignItems="center">
			{ isFetching ? (
				<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
					<CircularProgress size={ 50 }/>
					<LoadingText fontSize={ { xs: 17, md: 17 } }>{ page.dashboard.loadingText }</LoadingText>
				</Box>
			) : words.length ? children : (
				<Typography fontFamily='Montseratt'>Your dictionary is empty</Typography>
			) }
		</Box>
	);
};

export default ProgramWrapper;