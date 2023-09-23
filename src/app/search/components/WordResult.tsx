import AddIcon from '@mui/icons-material/Add';
import { Box, styled, Typography } from '@mui/material';
import { WordDefinition } from '@/types';
import { AuthContext } from '@/context/AuthContextProvider';
import { useContext } from 'react';

const WordContainer = styled(Box)({
	padding: '16px 0',
	display: 'flex',
	alignItems: 'center',
	borderTop: '1px solid lightgray',
	':first-of-type': {
		borderTop: 'none'
	}
});

const StyledAddIcon = styled(AddIcon)({
	borderRadius: '50%',
	transition: '0.2s',
	cursor: 'pointer',
	':hover': {
		backgroundColor: '#eeeeee'
	}
});

interface WordResultProps {
	word: WordDefinition,
	handleClickAddWord: (word: { definition: string, example: string }) => void
}

export default function WordResult({ word, handleClickAddWord }: WordResultProps) {
	const { loggedIn } = useContext(AuthContext);
	return (
		<WordContainer>
			{
				loggedIn && (
					<StyledAddIcon
						transform="scale(1.8)"
						sx={ { m: '0 20px 0 0', cursor: 'pointer' } }
						onClick={ () => handleClickAddWord(word) }
					/>
				)
			}
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
		</WordContainer>
	);
}