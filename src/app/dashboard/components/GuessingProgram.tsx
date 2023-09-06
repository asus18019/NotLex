'use client';
import { Box, styled, Typography } from '@mui/material';
import { CardData } from '@/types';
import { useShuffleWords } from '@/hooks/useShuffleWords';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useMemo, useRef, useState } from 'react';
import ProgramWrapper from '@/app/dashboard/components/ProgramWrapper';
import { getOptionColor } from '@/utils/getOptionColor';
import ProgramNav from '@/app/dashboard/components/ProgramNav';
import { useProgress } from '@/hooks/useProgress';
import { useCredentials } from '@/hooks/useCredentials';

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
	padding: '10px 0',
	maxWidth: '530px',
	margin: '0 auto'
});

const AnswerText = styled(Typography)({
	fontSize: '15px',
	fontFamily: 'Montserrat',
	fontWeight: 500
});

interface GuessingProgramProps {
	type: 'GuessMeaning' | 'GuessWord',
	words: CardData[],
	activeWord: CardData,
	removeCard: (id: string) => void,
	isFetching: boolean,
	closeProgram: () => void
}

const GuessingProgram = ({ type, words, activeWord, removeCard, isFetching, closeProgram }: GuessingProgramProps) => {
	const nextTimeoutRef = useRef<NodeJS.Timeout | undefined>();
	const { shuffleWords } = useShuffleWords();
	const [secret = ''] = useCredentials();
	const { updateProgress } = useProgress();
	const [answer, setAnswer] = useState<CardData | undefined>();
	const randomWords = useMemo(() => shuffleWords(words, activeWord), [activeWord]);

	const handleClickAnswer = (word: CardData) => {
		if(answer) return;
		setAnswer(word);
		const isCorrect = word.meaning === activeWord.meaning;

		updateProgress(secret, activeWord.id, isCorrect ? 2 : -2);
		nextTimeoutRef.current = setTimeout(() => {
			setAnswer(undefined);
			removeCard(activeWord.id);
		}, 3000);
	};

	const skipWord = () => {
		removeCard(activeWord.id);
		setAnswer(undefined);
		clearTimeout(nextTimeoutRef.current);
	};

	const renderContent = (guessMeaningContent: string, guessWordContent: string) => {
		return type === 'GuessMeaning' ? guessMeaningContent : guessWordContent;
	};

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<Box display="flex" flexDirection="column" justifyContent="center">
				{ words.map((word) => {
					return word === activeWord && (
						<Box>
							<MainWord>{ capitalizeFirstLetter(renderContent(word.word, word.meaning)) }</MainWord>
							<Box border="1px solid lightgray" borderRadius="10px" width={ { xs: '100%', md: '550px' } }>
								{ randomWords.map(word => (
									<QuizOption
										key={ word.id }
										onClick={ () => handleClickAnswer(word) }
										bgcolor={ getOptionColor(answer, activeWord, word) }
									>
										<AnswerText>{ capitalizeFirstLetter(renderContent(word.meaning, word.word)) }</AnswerText>
									</QuizOption>
								)) }
							</Box>
						</Box>
					);
				}) }
				<ProgramNav closeProgram={ closeProgram } skipWord={ skipWord }/>
			</Box>
		</ProgramWrapper>

	);
};

export default GuessingProgram;