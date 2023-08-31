import WordCard from '@/app/dashboard/components/WordCard';
import { Box, styled, Typography } from '@mui/material';
import { CardData } from '@/types';
import ProgramWrapper from '@/app/dashboard/components/ProgramWrapper';
import ProgramNav from '@/app/dashboard/components/ProgramNav';

export const LoadingText = styled(Typography)({
	fontFamily: 'Montserrat',
	fontWeight: '400',
	marginTop: '15px'
});

interface RepeatProps {
	words: CardData[],
	activeWord: CardData,
	removeCard: (id: string, action?: 'right' | 'left') => void,
	isFetching: boolean,
	closeProgram: () => void
}

export const Repeat = ({ words, activeWord, removeCard, isFetching, closeProgram }: RepeatProps) => {
	const skipWord = () => removeCard(activeWord.id);

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<Box display="flex" flexDirection="column" justifyContent="center">
				{ words.map((word) => (
					<WordCard key={ word.id } { ...{ data: word, active: activeWord === word, removeCard } }/>
				)) }
				<ProgramNav closeProgram={ closeProgram } skipWord={ skipWord }/>
			</Box>
		</ProgramWrapper>
	);
};

export default Repeat;