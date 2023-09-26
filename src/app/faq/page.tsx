import { Box, Typography } from '@mui/material';
import { Metadata } from 'next';
import { faq } from '@/config/faq';
import AccordionFaq from './components/AccordionFaq';

export const metadata: Metadata = {
	title: 'Add | NotLex',
	description: 'Add a new word to your Notion database using NotLex'
};

export default function About() {
	return (
		<Box width="100%" display="flex" justifyContent="center" alignItems="center" padding="10px 0"
		     flexDirection="column">
			<Typography
				fontFamily="Montserrat"
				fontSize={ 20 }
				margin={ { xs: '10px 0', md: '30px 0' } }
			>
				Frequently asked
				questions
			</Typography>
			<Box maxWidth="700px">
				{ faq.map((question, index) => (
					<AccordionFaq
						key={ index }
						question={ question.question }
						answer={ question.answer }/>
				)) }
			</Box>
		</Box>
	);
};