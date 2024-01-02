'use client'
import { Box, Typography } from '@mui/material';
import Badge from '@/app/[lang]/library/components/Badge';

interface WordCardProps {
	word: string,
	progress: number,
	meaning: string,
	sentence: string,
	categories: string[]
}

export default function WordCard({ word, progress, meaning, sentence, categories }: WordCardProps) {
	return (
		<Box width={{ xs: 'calc(100%-32px)', md: '700px' }} bgcolor="lightcyan" padding="15px" borderRadius="10px" mt="10px">
			<Box display="flex" justifyContent="space-between">
				<Typography fontFamily="Montserrat" fontSize="16px" color="darkcyan" fontWeight="600">{ word }</Typography>
				<Badge text={`${ progress }%`} color="darkcyan" fontSize="15px"/>
			</Box>
			<Typography fontFamily="Montserrat" fontSize="14px" component="p" mt="5px">{ meaning }</Typography>
			<Typography fontFamily="Montserrat" fontSize="14px" component="p" mt="5px" color="slategray">{ sentence }</Typography>
			<Box mt="5px" display="flex" flexWrap="wrap" gap="5px">
				{ categories.map(category => <Badge key={ category } text={ category } color="#e6ca02" fontSize="13px"/>) }
			</Box>
		</Box>
	);
};