'use client';
import { Box, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingText } from '@/app/dashboard/components/Repeat';
import { CardData } from '@/types';
import { useShuffleWords } from '@/hooks/useShuffleWords';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useMemo, useState } from 'react';

const QuizOption = styled(Box)({
	padding: '8px 10px',
	cursor: 'pointer',
	':first-of-type': {
		borderRadius: '10px 10px 0 0',
		paddingTop: '16px'
	},
	':last-child': {
		borderRadius: '0 0 10px 10px',
		paddingBottom: '16px'
	},
	':hover': {
		backgroundColor: '#eeeeee'
	}
});

interface GuessMeaningProps {
	words: CardData[],
	activeWord: CardData,
	removeCard: (id: string) => void,
	isFetching: boolean
}

const GuessMeaning = ({ words, activeWord, removeCard, isFetching }: GuessMeaningProps) => {
	const { shuffleWords } = useShuffleWords();
	const [answer, setAnswer] = useState<CardData | undefined>();
	const randomWords = useMemo(() => shuffleWords(words, activeWord), [activeWord]);

	const handleClickAnswer = (word: CardData) => {
		setAnswer(word)
		console.log(`correct: ${ word.meaning === activeWord.meaning }`);
		setTimeout(() => {
			setAnswer(undefined);
			removeCard(activeWord.id);
		}, 3000)
	}

	return (
		<Box display="flex" justifyContent="center" height="calc(100vh - 81px)" alignItems="center">
			{ isFetching ? (
				<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
					<CircularProgress size={ 50 }/>
					<LoadingText fontSize={ { xs: 17, md: 17 } }>Loading your words...</LoadingText>
				</Box>
			) : words.length ? (
				words.map((word) => {
					return word === activeWord && (
						<Box>
							<Typography fontSize={ 20 } textAlign="center" fontFamily="Montserrat" fontWeight={ 700 } padding="10px 0">
								{ capitalizeFirstLetter(word.word) }
							</Typography>
							<Box border="1px solid lightgray" borderRadius="10px" width={{ xs: '100%', md: '550px' }}>
								{ randomWords.map(word => (
									<QuizOption key={ word.id } onClick={ () => handleClickAnswer(word) } bgcolor={ answer && (activeWord === word ? '#bfffcd !important': word === answer ? '#faafaf !important' : 'transparent') }>
										<Typography fontSize={ 15 } fontFamily="Montserrat" fontWeight={ 500 }>
											{ word.meaning }
										</Typography>
									</QuizOption>
								)) }
							</Box>
						</Box>
					);
				})) : (
				<Typography fontFamily="Montseratt">Your dictionary is empty</Typography>
			) }
		</Box>
	);
};

export default GuessMeaning;