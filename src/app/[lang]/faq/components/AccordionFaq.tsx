'use client';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LangContext } from '@/context/LangContextProvider';

interface AccordionFaqProps {
	question: {
		id: number,
		question: string,
		answer: ReactNode
	},
	searchParam: string | string[] | undefined
}

const AccordionFaq = ({ question, searchParam }: AccordionFaqProps) => {
	const router = useRouter();
	const { lang } = useContext(LangContext);
	const [expanded, setExpanded] = useState(searchParam?.includes(question.id.toString()));
	const parsedParams = typeof searchParam === 'string' ? searchParam.split(',') : [];

	const handleClickAccordion = () => {
		setExpanded(!expanded);

		let queryUrl: string;
		if(expanded) {
			const filteredParams = parsedParams.filter(param => Number(param) !== question.id);
			queryUrl = filteredParams.length ? `?questions=${ filteredParams }` : '';
		} else {
			queryUrl = `?questions=${ [...parsedParams, question.id] }`;
		}
		router.push(`/${ lang }/faq` + queryUrl);
	};

	return (
		<Accordion
			expanded={ expanded }
			onChange={ handleClickAccordion }
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
				<Typography fontFamily="Montserrat" fontWeight={ 700 }
				            fontSize={ 17 }>{ question.question }</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography fontFamily="Montserrat" sx={ { overflowWrap: 'anywhere' } }>{ question.answer }</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionFaq;