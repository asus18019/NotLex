import WordCard from '@/app/dashboard/components/WordCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, styled, Typography } from '@mui/material';
import { CardData } from '@/types';

export const LoadingText = styled(Typography)({
	fontFamily: 'Montserrat',
	fontWeight: '400',
	marginTop: '15px'
});

interface RepeatProps {
	words: CardData[],
	activeWord: CardData,
	removeCard: (id: string, action: 'right' | 'left') => void,
	isFetching: boolean
}

export const Repeat = ({ words, activeWord, removeCard, isFetching }: RepeatProps) => {
	return (
		<Box display="flex" justifyContent="center" height="calc(100vh - 81px)" alignItems="center">
			{ isFetching ? (
				<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
					<CircularProgress size={ 50 }/>
					<LoadingText fontSize={ { xs: 17, md: 17 } }>Loading your words...</LoadingText>
				</Box>
			) : words.length ? (
				words.map((word) => (
					<WordCard key={ word.id } { ...{ data: word, active: activeWord === word, removeCard } }/>
				))) : (
				<Typography fontFamily='Montseratt'>Your dictionary is empty</Typography>
			) }
		</Box>
	);
};

export default Repeat;