import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import { WordDefinition } from '@/types';

interface WordResultProps {
	word: WordDefinition,
	handleClickAddWord: (word: { definition: string, example: string }) => void
}

export default function WordResult({ word, handleClickAddWord }: WordResultProps) {
	return (
		<Box py={ 2 } display="flex" alignItems="center">
			<AddIcon
				transform="scale(1.8)"
				sx={ { m: '0 20px 0 0', cursor: 'pointer' } }
				onClick={ () => handleClickAddWord(word) }
			/>
			<Box>
				<Typography
					fontFamily="Montserrat"
					margin="5px 0"
					fontSize="18px"
					fontWeight={ 600 }
				>
					{ word.definition }
				</Typography>
				<Typography
					fontFamily="Montserrat"
					margin="5px 0"
					fontSize="15px"
					fontWeight={ 300 }
					color="#000000a6"
				>
					{ word.example }
				</Typography>
			</Box>
		</Box>
	);
}