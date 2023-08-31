import WordCard from '@/app/dashboard/components/WordCard';
import { styled, Typography } from '@mui/material';
import { CardData } from '@/types';
import ProgramWrapper from '@/app/dashboard/components/ProgramWrapper';

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
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			{ words.map((word) => (
				<WordCard key={ word.id } { ...{ data: word, active: activeWord === word, removeCard } }/>
			)) }
		</ProgramWrapper>
	);
};

export default Repeat;