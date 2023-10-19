import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, styled, Typography } from '@mui/material';
import { AuthContext } from '@/context/AuthContextProvider';
import { ChangeEvent, useContext, useState } from 'react';

const WordContainer = styled(Box)({
	padding: '16px 0',
	display: 'flex',
	alignItems: 'center',
	borderTop: '1px solid lightgray',
	':nth-of-type(2)': {
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
	word: {
		definition: string,
		example: string[]
	},
	handleClickAddWord: (word: { definition: string, example: string }) => void
}

export default function WordResult({ word, handleClickAddWord }: WordResultProps) {
	const { loggedIn } = useContext(AuthContext);

	const [selectedExample, setSelectedExample] = useState(word.example?.length ? word.example[0] : '');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedExample(event.target.value);
	};

	const handleClickAdd = () => handleClickAddWord({ definition: word.definition, example: selectedExample });

	return (
		<WordContainer>
			{ loggedIn && (
				<StyledAddIcon
					transform="scale(1.8)"
					sx={ { m: '0 20px 0 0', cursor: 'pointer' } }
					onClick={ handleClickAdd }
				/>
			) }
			<Box>
				<Typography
					fontFamily="Montserrat"
					margin="5px 0"
					fontSize="18px"
					fontWeight={ 600 }
				>
					{ word.definition }
				</Typography>
				{ word.example?.length && (
					<FormControl>
						<RadioGroup value={ selectedExample } onChange={ handleChange }>
							{ word.example?.map(example => {
								return <FormControlLabel
									key={ example }
									sx={ { color: '#000000a6' } }
									value={ example }
									control={ <Radio sx={ { p: '4px', ml: '10px' } }/> }
									label={ example }
								/>;
							}) }
						</RadioGroup>
					</FormControl>
				) }
			</Box>
		</WordContainer>
	);
}