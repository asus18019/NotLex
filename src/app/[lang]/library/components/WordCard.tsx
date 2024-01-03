'use client'
import { Box, styled, Typography } from '@mui/material';
import Badge from '@/app/[lang]/library/components/Badge';

const CardContainer = styled(Box)(({ theme }) => ({
	width: 'calc(100%-32px)',
	backgroundColor: "lightcyan",
	padding: "15px",
	borderRadius: "10px",
	marginTop: '10px',
	[theme.breakpoints.up('md')]: {
		width: '700px'
	}
}));

const ContentText = styled(Typography)({
	fontFamily: "Montserrat",
	fontSize: "14px",
	marginTop: "5px"
});

interface WordCardProps {
	word: string,
	progress: number,
	meaning: string,
	sentence: string,
	categories: string[]
}

export default function WordCard({ word, progress, meaning, sentence, categories }: WordCardProps) {
	return (
		<CardContainer>
			<Box display="flex" justifyContent="space-between">
				<Typography fontFamily="Montserrat" fontSize="16px" color="darkcyan" fontWeight="600">{ word }</Typography>
				<Badge text={`${ progress }%`} color="darkcyan" fontSize="15px"/>
			</Box>
			<ContentText>{ meaning }</ContentText>
			<ContentText color="slategray">{ sentence }</ContentText>
			<Box mt="5px" display="flex" flexWrap="wrap" gap="5px">
				{ categories.map(category => (
					<Badge key={ category } text={ category } color="#e6ca02" fontSize="13px"/>
				)) }
			</Box>
		</CardContainer>
	);
};