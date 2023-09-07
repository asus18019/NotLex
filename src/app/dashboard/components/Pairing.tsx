import ProgramNav from '@/app/dashboard/components/ProgramNav';
import { Box, styled } from '@mui/material';
import { CardData } from '@/types';
import ProgramWrapper from './ProgramWrapper';
import { shuffleArray } from '@/utils/shuffleArray';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { MainWord } from './GuessingProgram';
import { useMemo, useState } from 'react';
import { useCredentials } from '@/hooks/useCredentials';
import { useProgress } from '@/hooks/useProgress';

const OptionBox = styled(Box)({
	display: 'flex',
	padding: '10px',
	alignItems: 'center',
	cursor: 'pointer',
	border: '1px solid lightgray',
	borderTop: "none",
	fontFamily: "Montserrat",
	fontSize: "15px",
	':hover': {
		backgroundColor: '#eeeeee'
	},
	':first-of-type': {
		borderRadius: '10px 0 0 0',
		borderTop: "1px solid lightgray",
	},
	':nth-of-type(2)': {
		borderRadius: '0 10px 0 0',
		borderTop: "1px solid lightgray",
	},
	':nth-of-type(odd)': {
		borderRight: "none"
	},
	':last-of-type': {
		borderRadius: '0 0 10px 0'
	},
	':nth-last-of-type(2)': {
		borderRadius: '0 0 0 10px'
	}
});

interface PairingProps {
	words: CardData[],
	removeCard: (id: string) => void,
	isFetching: boolean,
	closeProgram: () => void
}

interface SelectedOption extends CardData {
	type: "word" | "meaning"
}

const Pairing = ({ words, removeCard, isFetching, closeProgram }: PairingProps) => {
	const [secret = ''] = useCredentials();
	const { updateProgress } = useProgress();
	const [selected, setSelected] = useState<SelectedOption | undefined>(undefined);
	const [answers, setAnswers] = useState<{ id: string, isCorrect: boolean }[]>([]);
	const activeWords: CardData[] = useMemo(() => shuffleArray(words.slice(0, 10)), [words]);
	const shuffledAnswers = useMemo(() => shuffleArray(words.slice(0, 10)), [words]);

	const handleClickOption = (selectedOption: SelectedOption, type: "word" | "meaning") => {
		if(!selected) {
			return setSelected(selectedOption);
		} else {
			if(answers.some(answer => answer.id === selectedOption.id)) {
				return
			}
			if(selected.type === type && selected.id === selectedOption.id) {
				return setSelected(undefined);
			} else if(selected.type === type) {
				return setSelected(selectedOption);
			} else {
				const isCorrect = selectedOption.id === selected.id;
				updateProgress(secret, selected.id, isCorrect ? 2 : -2);
				setAnswers(prev => [...prev, { id: selected.id, isCorrect }])
				setSelected(undefined);
			}
		}
	}

	const getOptionColor = (word: CardData, type: "word" | "meaning"): string => {
		const answer = answers.find(answer => answer.id === word.id)
		if(answer) {
			if(answer.isCorrect) {
				return "#bfffcd !important";
			} else {
				return "#faafaf !important";
			}
		}
		if(!selected) return "transparent";

		if(selected.id === word.id && selected.type === type) {
			return "lightgray !important"
		} else {
			return "transparent";
		}
	}

	const skipWord = () => {
		activeWords.forEach((word) => removeCard(word.id));
		setAnswers([]);
	}

	const isAnswered = answers.length === (answers.length < 10 ? words.length : 10);

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<Box display="flex" flexDirection="column" justifyContent="center" width={ { xs: '100%', md: '550px' } }>
				<MainWord>Match each option with its correct answer</MainWord>
				<Box display="flex" justifyContent="center" flexWrap="wrap">
					{ activeWords.map((word, index) => (
						<>
							<OptionBox
								width="calc(35% - 22px)"
								bgcolor={ getOptionColor(word, "word") }
								onClick={ () => handleClickOption({ ...word, type: "word" }, "word") }
							>
								{ capitalizeFirstLetter(word.word) }
							</OptionBox>
							<OptionBox
								width="calc(65% - 22px)"
								bgcolor={ getOptionColor(shuffledAnswers[index], "meaning") }
								onClick={ () => handleClickOption({ ...shuffledAnswers[index], type: "meaning" }, "meaning") }
							>
								{ capitalizeFirstLetter(shuffledAnswers[index].meaning) }
							</OptionBox>
						</>
					)) }
				</Box>
				<ProgramNav closeProgram={ closeProgram } skipWord={ skipWord } isAnswered={ isAnswered }/>
			</Box>
		</ProgramWrapper>
	);
};

export default Pairing;