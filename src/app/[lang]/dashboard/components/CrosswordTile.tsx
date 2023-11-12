import { ChangeEvent, useState } from 'react';
import { Box, InputBase } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface CrosswordTileProps {
	char: string,
	clue?: {
		index: number,
		direction: 'across' | 'down'
	}
}

const CrosswordTile = ({ char, clue }: CrosswordTileProps) => {
	const [currentChar, setCurrentChar] = useState<string>(char);
	const type = char === '-' ? 'empty' : char === '*' ? 'blocked' : 'fill';

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.target.value.toUpperCase();
		const newChar = value.charAt(currentChar.length > 0 ? 1 : 0);
		setCurrentChar(value === '' ? '' : newChar);
	};

	return (
		<Box
			bgcolor={ type === 'empty' ? 'azure' : char === '*' ? 'lightgray' : 'lightblue' }
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
			sx={ { cursor: type === 'empty' ? 'arrow' : 'pointer' } }
		>
			{ type !== 'empty' && (
				<InputBase
					value={ currentChar === '*' ? '' : currentChar }
					disabled={ type === 'blocked' }
					onChange={ handleChange }
					inputProps={ { style: { textAlign: 'center' } } }
				/>
			) }
			{ clue && (
				<Box
					position="absolute"
					top="1px"
					left="1px"
					fontSize="12px"
					display="flex"
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