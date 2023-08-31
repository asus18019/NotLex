'use client';
import { Box, styled, Typography } from '@mui/material';
import { CardData } from '@/types';
import { useShuffleWords } from '@/hooks/useShuffleWords';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useMemo, useState } from 'react';
import ProgramWrapper from '@/app/dashboard/components/ProgramWrapper';
import { getOptionColor } from '@/utils/getOptionColor';

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

const MainWord = styled(Typography)({
	fontSize: '20px',
	textAlign: 'center',
	fontFamily: 'Montserrat',
	fontWeight: 700,
	padding: '10px 0'
});

const AnswerText = styled(Typography)({
	fontSize: '15px',
	fontFamily: 'Montserrat',
	fontWeight: 500
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
		setAnswer(word);
		console.log(`correct: ${ word.meaning === activeWord.meaning }`);
		setTimeout(() => {
			setAnswer(undefined);
			removeCard(activeWord.id);
		}, 3000);
	};

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			{ words.map((word) => {
				return word === activeWord && (
					<Box>
						<MainWord>{ capitalizeFirstLetter(word.word) }</MainWord>
						<Box border="1px solid lightgray" borderRadius="10px" width={ { xs: '100%', md: '550px' } }>
							{ randomWords.map(word => (
								<QuizOption
									key={ word.id }
									onClick={ () => handleClickAnswer(word) }
									bgcolor={ getOptionColor(answer, activeWord, word) }
								>
									<AnswerText>{ word.meaning }</AnswerText>
								</QuizOption>
							)) }
						</Box>
					</Box>
				);
			}) }
		</ProgramWrapper>

	);
};

export default GuessMeaning;