import { Box, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useContext } from 'react';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';

interface ProgramNavProps {
	closeProgram: () => void,
	skipWord: () => void,
	isAnswered: boolean
}

const ProgramNav = ({ closeProgram, skipWord, isAnswered }: ProgramNavProps) => {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	const { back, next, skip } = page.dashboard.navigation;
	return (
		<Box display="flex" flexWrap="nowrap" mt="10px">
			<Button
				fullWidth
				variant="text"
				startIcon={ <KeyboardBackspaceIcon/> }
				sx={{ color: '#4f4f4f', fontFamily: "Montserrat" }}
				onClick={ closeProgram }
			>
				{ back }
			</Button>
			<Button
				fullWidth
				variant="text"
				endIcon={ <SkipNextIcon/> }
				sx={{ color: '#4f4f4f', fontFamily: "Montserrat" }}
				onClick={ skipWord }
			>
				{ isAnswered ? next : skip }
			</Button>
		</Box>
	);
};

export default ProgramNav;