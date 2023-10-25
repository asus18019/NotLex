import ProgramNav from '@/app/[lang]/dashboard/components/ProgramNav';
import { Box, styled } from '@mui/material';
import { CardData } from '@/types';
import ProgramWrapper from './ProgramWrapper';
import { shuffleArray } from '@/utils/shuffleArray';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { MainWord } from './GuessingProgram';
import { Fragment, useContext, useMemo, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';

const OptionBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	padding: '10px',
	alignItems: 'center',
	cursor: 'pointer',
	border: '1px solid lightgray',
	borderTop: 'none',
	fontFamily: 'Montserrat',
	fontSize: '15px',
	[theme.breakpoints.up('md')]: {
		':hover': {
			backgroundColor: '#eeeeee'
		}
	},
	':first-of-type': {
		borderRadius: '10px 0 0 0',
		borderTop: '1px solid lightgray'
	},
	':nth-of-type(2)': {
		borderRadius: '0 10px 0 0',
		borderTop: '1px solid lightgray'
	},
	':nth-of-type(odd)': {
		borderRight: 'none',
		width: 'calc(35% - 22px)'
	},
	':nth-of-type(even)': {
		width: 'calc(65% - 22px)'
	},
	':last-of-type': {
		borderRadius: '0 0 10px 0'
	},
	':nth-last-of-type(2)': {
		borderRadius: '0 0 0 10px'
	}
}));

const ContentContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: '100%',
	margin: '20px 0',
	[theme.breakpoints.up('md')]: {
		width: '550px'
	}
}));

interface PairingProps {
	words: CardData[],
	removeCard: (id: string) => void,
	isFetching: boolean,
	closeProgram: () => void
}

interface SelectedOption extends CardData {
	type: 'word' | 'meaning';
}

const Pairing = ({ words, removeCard, isFetching, closeProgram }: PairingProps) => {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	const { updateProgress } = useProgress();
	const [selected, setSelected] = useState<SelectedOption | undefined>(undefined);
	const [answers, setAnswers] = useState<{ id: string, isCorrect: boolean }[]>([]);

	const activeWords = useMemo(() => [...words].reverse().slice(0, 10), [words]);
	const shuffledWords = useMemo(() => shuffleArray([...activeWords]), [activeWords]);
	const shuffledAnswers = useMemo(() => shuffleArray([...activeWords]), [activeWords]);

	const handleClickOption = (selectedOption: SelectedOption, type: 'word' | 'meaning') => {
		const isClickedOptionAnswered = answers.some(answer => answer.id === selectedOption.id);

		if(!selected && !isClickedOptionAnswered) {
			setSelected(selectedOption);
		}

		if(selected) {
			if(isClickedOptionAnswered) {
				return;
			} else if(selected.type === type && selected.id === selectedOption.id) {
				setSelected(undefined);
			} else if(selected.type === type) {
				setSelected(selectedOption);
			} else {
				const isCorrect = selectedOption.id === selected.id;
				updateProgress(selected.id, isCorrect ? 2 : -2);
				setAnswers(prev => [...prev, { id: selected.id, isCorrect }]);
				setSelected(undefined);
			}
		}

	};

	const getOptionColor = (word: CardData, type: 'word' | 'meaning'): string => {
		const answer = answers.find(answer => answer.id === word.id);
		if(answer) {
			if(answer.isCorrect) {
				return '#bfffcd !important';
			} else {
				return '#faafaf !important';
			}
		}
		if(!selected) return 'transparent';

		if(selected.id === word.id && selected.type === type) {
			return 'lightgray !important';
		} else {
			return 'transparent';
		}
	};

	const skipWord = () => {
		shuffledWords.forEach((word) => removeCard(word.id));
		setAnswers([]);
	};

	const closePairingProgram = () => {
		answers.forEach(answer => removeCard(answer.id));
		closeProgram();
	};

	const isAnswered = answers.length === (answers.length < 10 ? words.length : 10);

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<ContentContainer>
				<MainWord>{ page.dashboard.programs.pairing.headerTitle }</MainWord>
				<Box display="flex" justifyContent="center" flexWrap="wrap">
					{ shuffledWords.map((word, index) => (
						<Fragment key={ word.id }>
							<OptionBox
								bgcolor={ getOptionColor(word, 'word') }
								onClick={ () => handleClickOption({ ...word, type: 'word' }, 'word') }
							>
								{ capitalizeFirstLetter(word.word) }
							</OptionBox>
							<OptionBox
								bgcolor={ getOptionColor(shuffledAnswers[index], 'meaning') }
								onClick={ () => handleClickOption({
									...shuffledAnswers[index],
									type: 'meaning'
								}, 'meaning') }
							>
								{ capitalizeFirstLetter(shuffledAnswers[index].meaning) }
							</OptionBox>
						</Fragment>
					)) }
				</Box>
				<ProgramNav closeProgram={ closePairingProgram } skipWord={ skipWord } isAnswered={ isAnswered }/>
			</ContentContainer>
		</ProgramWrapper>
	);
};

export default Pairing;