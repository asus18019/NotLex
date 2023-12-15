import { ChangeEvent, useRef, useState } from 'react';
import { Box, InputBase } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface CrosswordTileProps {
	id: string,
	char: string,
	clue?: {
		index: number,
		direction: 'across' | 'down'
	},
	isCorrect: boolean,
	pushResult: (char: { id: string, char: string }) => void;
}

const CrosswordTile = ({ id, char, clue, isCorrect, pushResult }: CrosswordTileProps) => {
	const [currentChar, setCurrentChar] = useState<string>(isCorrect && char !== '*' ? char : '');
	const type = char === '-' ? 'empty' : char === '*' ? 'blocked' : 'fill';
	const clueRef = useRef<HTMLInputElement | null>(null);

	if(type === 'blocked') {
		pushResult({ id, char: '*' });
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.target.value.toUpperCase();
		const newChar = value.charAt(currentChar.length > 0 ? 1 : 0);
		setCurrentChar(value === '' ? '' : newChar);
		pushResult({ id, char: value === '' ? '' : newChar });
	};

	const handleInputFocus = () => {
		if(!clueRef.current) return;
		clueRef.current?.focus();
	}

	return (
		<Box
			bgcolor={ type === 'empty' ? 'azure' : char === '*' ? 'lightgray' : isCorrect ? 'lightgreen' : 'lightblue' }
			width="30px"
			height="30px"
			margin="1px"
			display="flex"
			position="relative"
			justifyContent="center"
			alignItems="center"
			borderRadius="6px"
			border="1px solid black"
			fontWeight="bold"
			textAlign="center"
			sx={ { cursor: type === 'empty' ? 'arrow' : 'text' } }
		>
			{ type !== 'empty' && (
				<InputBase
					value={ currentChar }
					disabled={ type === 'blocked' || isCorrect }
					onChange={ handleChange }
					inputProps={ { style: { textAlign: 'center' }, ref: clueRef } }
				/>
			) }
			{ clue && (
				<Box
					position="absolute"
					top="1px"
					left="1px"
					fontSize="12px"
					display="flex"
					sx={{ cursor: "text" }}
					onClick={ handleInputFocus }
				>
					<p>{ clue.index }</p>
					<ArrowRightAltIcon sx={ {
						position: 'absolute',
						top: clue.direction === 'down' ? 7 : -9,
						left: clue.direction === 'down' ? -9 : 6,
						transform: `rotate(${ clue.direction === 'down' ? 90 : 0 }deg)`
					} }
					/>
				</Box>
			) }
		</Box>
	);
};

export default CrosswordTile;