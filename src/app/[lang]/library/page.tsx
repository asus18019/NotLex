'use client';
import { useCredentials } from '@/hooks/useCredentials';
import Link from 'next/link';
import { fetchWords } from '@/utils/fetchWords';
import { useEffect, useState } from 'react';
import { CardData } from '@/types';
import WordCard from '@/app/[lang]/library/components/WordCard';
import { Box, Pagination, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@/app/[lang]/library/components/Badge';

export default function Library() {
	const { accessToken = '' } = useCredentials();

	const [isFetching, setIsFetching] = useState(true);
	const [words, setWords] = useState<CardData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(25);
	const [totalWords, setTotalWords] = useState<number>(0);

	useEffect(() => {
		setIsFetching(true);
		fetchWords(accessToken, { randomize: false, pageSize, page: page })
			.then(response => {
				if(!response.ok) {
					throw new Error('Something went wrong');
				}
				return response.json();
			})
			.then(result => {
				setWords(result.data);
				setTotalWords(result.total);
			})
			.catch(error => console.log(error))
			.finally(() => setIsFetching(false));
	}, [accessToken, page]);

	const changePage = (_e: any, page: number) => setPage(page);

	return (
		<Box display="flex" alignItems="center" mt="10px" flexDirection="column" minHeight="80vh" justifyContent="center">
			<Link href="/library/add">Add</Link>
			{ isFetching ? (
				<CircularProgress/>
			) : (
				<>
					<Box display="flex" alignItems="center" gap="4px" width="80%">
						<Typography fontFamily="Montserrat" fontSize="16px" fontWeight="600">Total:</Typography>
						<Badge text={`${ totalWords }`} color="darkcyan" fontSize="15px"/>
						<Typography fontFamily="Montserrat" fontSize="16px">words saved</Typography>
					</Box>
					<Typography fontFamily="Montserrat" fontSize="18px">Explore your saved words</Typography>
					<Box>
						{ words.map(word => <WordCard
							key={ word.id }
							word={ word.word }
							progress={ word.progress }
							meaning={ word.meaning }
							sentence={ word.sentence }
							categories={ word.word_category }
						/>) }
					</Box>
					<Pagination
						sx={{ m: '15px 0 30px 0' }}
						page={ page }
						defaultPage={ 1 }
						count={ Math.ceil(totalWords / pageSize) }
						shape="rounded"
						onChange={ changePage }
						variant="outlined"
					/>
				</>
			) }
		</Box>
	);
};