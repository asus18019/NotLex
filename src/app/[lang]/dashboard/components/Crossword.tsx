import { CardData } from '@/types';
import ProgramWrapper from '@/app/[lang]/dashboard/components/ProgramWrapper';
import { Box } from '@mui/material';
import ProgramNav from '@/app/[lang]/dashboard/components/ProgramNav';
import { useMemo, useRef, useState } from 'react';
import { shuffleArray } from '@/utils/shuffleArray';
import CrosswordTile from '@/app/[lang]/dashboard/components/CrosswordTile';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import clg from 'crossword-layout-generator';
import { useProgress } from '@/hooks/useProgress';

interface CrosswordProps {
	words: CardData[],
	removeCard: (id: string) => void,
	isFetching: boolean,
	closeProgram: () => void
}

const Crossword = ({ isFetching, words, closeProgram, removeCard }: CrosswordProps) => {
	type CharObg = { id: string, char: string };
	const activeWords = useMemo(() => [...words].reverse().slice(0, 10), [words]);
	const shuffledWords = useMemo(() => shuffleArray([...activeWords]), [activeWords]);
	const { updateProgress } = useProgress();

	console.log(shuffledWords);

	const userChars = useRef<CharObg[]>([]);
	const [correctIds, setCorrectIds] = useState<string[]>([]);

	const skipWord = () => {
		shuffledWords.forEach((word) => removeCard(word.id));
	};

	let layout = useMemo(() => {
		return shuffledWords.length && clg.generateLayout(shuffledWords.map(word => {
			return {
				answer: word.word
					.replaceAll(' ', '*')
					.replaceAll('-', '—')
					.toUpperCase()
			};
		}))
	}, [shuffledWords]);

	if(layout) {
		layout.table = useMemo(() => layout.table.map((row: string[]) => {
			return row.map(char => ({ id: uuidv4(), char }));
		}), [shuffledWords])

		layout.resultWithIds = useMemo(() => layout.result.map((answer: any) => {
			const res = [];
			for(let i = 0; i < answer.answer.length; i++) {
				if(answer.orientation === 'across') {
					res.push(layout.table[answer.starty - 1][answer.startx - 1 + i]);
				} else {
					res.push(layout.table[answer.starty - 1 + i][answer.startx - 1]);
				}
			}
			return res;
		}), [shuffledWords]);
	}


	const questions = shuffledWords.map(word => {
		const index = layout.result.findIndex((res: any) => res.answer === (word.word
				.replaceAll(' ', '*')
				.replaceAll('-', '—')
				.toUpperCase()
		));

		return {
			index: index + 1,
			text: word.meaning,
			answ: word.word
		};
	});

	const handleUserInput = (newChar: CharObg) => {
		const index = userChars.current.findIndex(e => e.id === newChar.id);

		if(newChar.char === '') {
			userChars.current.splice(index, 1);
			console.log(userChars.current);
			return;
		}
		if(userChars.current.some(c => c.id === newChar.id)) {
			 userChars.current[index] = newChar
		} else {
			userChars.current.push(newChar);
		}

		for(const word of layout.resultWithIds) {
			let res: string[] = [];
			for(const char of word) {
				const foundElem = userChars.current.find(e => e.id === char.id);
				if(foundElem && foundElem.char === char.char){
					res.push(foundElem.id);
				}
			}

			if(word.length === res.length) {
				let allExist = res.every(id => correctIds.includes(id));
				if(!allExist) {
					setCorrectIds(prev => [...prev, ...res]);

					const concatenatedWord = word.map((d: any) => d.char.toLowerCase()).join('');
					const pageId = shuffledWords.find(storedWord => storedWord.word.toLowerCase() === concatenatedWord)?.id;
					if(pageId) {
						updateProgress(pageId, 8);
					}
				}
			}
		}
	}

	const renderRows = useMemo(() => {
		return layout?.table?.map((row: { id: string, char: string }[], rowIndex: number) => (
			<Box display="flex" key={ uuidv4() } flexDirection="row">
				{ row.map((char, columnIndex) => {
					let word = layout.result.find((word: any) => {
						return word.startx === (columnIndex + 1) && word.starty === (rowIndex + 1);
					});

					return (
						<CrosswordTile
							key={ char.id }
							id={ char.id }
							char={ char.char }
							clue={ word &&
								{ index: layout.result.indexOf(word) + 1, direction: word.orientation }
							}
							isCorrect={ correctIds.includes(char.id) }
							pushResult={ handleUserInput }
						/>);
				}) }
			</Box>
		))
	}, [shuffledWords, correctIds]);

	return (
		<ProgramWrapper isFetching={ isFetching } words={ words }>
			<Box display="flex" flexDirection="column" justifyContent="center">
				{ questions.map(q => (
					<p key={ uuidv4() }>{ q.index }) { q.text }</p>
				)) }
				{ renderRows }
				<ProgramNav closeProgram={ closeProgram } skipWord={ skipWord } isAnswered={ false }/>
			</Box>
		</ProgramWrapper>
	);
};

export default Crossword;