import { CardData } from '@/types';
import ProgramWrapper from '@/app/[lang]/dashboard/components/ProgramWrapper';
import { Box } from '@mui/material';
import ProgramNav from '@/app/[lang]/dashboard/components/ProgramNav';
import { useMemo } from 'react';
import { shuffleArray } from '@/utils/shuffleArray';
import CrosswordTile from '@/app/[lang]/dashboard/components/CrosswordTile';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import clg from 'crossword-layout-generator';

interface CrosswordProps {
	words: CardData[],
	removeCard: (id: string) => void,
	isFetching: boolean,
	closeProgram: () => void
}

const Crossword = ({ isFetching, words, closeProgram, removeCard }: CrosswordProps) => {
	const activeWords = useMemo(() => [...words].reverse().slice(0, 10), [words]);
	const shuffledWords = useMemo(() => shuffleArray([...activeWords]), [activeWords]);

	const skipWord = () => {
		shuffledWords.forEach((word) => removeCard(word.id));
	};

	 const layout = shuffledWords.length && clg.generateLayout(shuffledWords.map(word => {
		return {
			answer: word.word
				.replaceAll(' ', '*')
				.replaceAll('-', '—')
				.toUpperCase()
		};
	}));

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<Box display="flex" flexDirection="column" justifyContent="center">
				{ layout?.table?.map((row: string[], rowIndex: number) => (
					<Box display="flex" key={ uuidv4() } flexDirection="row">
						{ row.map((char, columnIndex) => {
							// @ts-ignore
							let word = layout.result.find((word: any) => word.startx === (columnIndex + 1) && word.starty === (rowIndex + 1));
							// @ts-ignore
							const index = word && layout.result.findIndex(word1 => word1 === word);
							console.log(word && { index, direction: word.orientation } || "");
							return (<CrosswordTile key={ uuidv4() } char={ char } clue={ word && { index: index + 1, direction: word.orientation } }/>);
						}) }
					</Box>
				)) }
				<ProgramNav closeProgram={ closeProgram } skipWord={ skipWord } isAnswered={ false }/>
			</Box>
		</ProgramWrapper>
	);
};

export default Crossword;