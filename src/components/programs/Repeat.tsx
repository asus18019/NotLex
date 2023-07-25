import WordCard from '@/components/WordCard';
import { Box } from '@mui/material';
import { CardData } from '@/types';

interface RepeatProps {
	words: CardData[],
	activeWord: CardData,
	removeCard: (id: string, action: 'right' | 'left') => void
}

export const Repeat = ({ words, activeWord, removeCard }: RepeatProps) => {
	return (
		<Box display="flex" justifyContent="center" height="calc(100vh - 81px)" alignItems="center">
			{ words.length ? (
				words.map((word) => (
					<WordCard
						key={ word.id }
						data={ word }
						active={ activeWord === word }
						removeCard={ removeCard }
					/>
				))) : (
				<h2 className="absolute z-10 text-center text-2xl font-bold text-textGrey ">
					Excessive swiping can be injurious to health!
					<br/>
					Come back tomorrow for more
				</h2>
			) }
		</Box>
	);
};

export default Repeat;