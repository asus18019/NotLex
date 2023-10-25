import { Box, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface ProgramNavProps {
	closeProgram: () => void,
	skipWord: () => void,
	isAnswered: boolean
}

const ProgramNav = ({ closeProgram, skipWord, isAnswered }: ProgramNavProps) => {
	return (
		<Box display="flex" flexWrap="nowrap" mt="10px">
			<Button
				fullWidth
				variant="text"
				startIcon={ <KeyboardBackspaceIcon/> }
				sx={{ color: '#4f4f4f', fontFamily: "Montserrat" }}
				onClick={ closeProgram }
			>
				Back
			</Button>
			<Button
				fullWidth
				variant="text"
				endIcon={ <SkipNextIcon/> }
				sx={{ color: '#4f4f4f', fontFamily: "Montserrat" }}
				onClick={ skipWord }
			>
				{ isAnswered ? "Next" : "Skip" }
			</Button>
		</Box>
	);
};

export default ProgramNav;