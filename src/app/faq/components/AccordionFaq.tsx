'use client';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode, useState } from 'react';

interface AccordionFaqProps {
	question: string,
	answer: string | ReactNode
}

const AccordionFaq = ({ question, answer }: AccordionFaqProps) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Accordion
			expanded={ expanded }
			onChange={ () => setExpanded(!expanded) }
			sx={ {
				borderRadius: '8px !important',
				'&::before': { content: 'none' },
				marginY: '16px',
				bgcolor: expanded ? 'transparent' : '#F5F4F4',
				boxShadow: expanded ? 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;' : 'none',
				padding: '5px 10px'
			} }
		>
			<AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
				<Typography fontFamily="Montserrat" fontWeight={ 700 } fontSize={ 17 }>{ question }</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography fontFamily="Montserrat" sx={{ overflowWrap: 'anywhere' }}>{ answer }</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionFaq;