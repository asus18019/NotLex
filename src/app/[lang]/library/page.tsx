'use client';
import { useCredentials } from '@/hooks/useCredentials';
import Link from 'next/link';
import { fetchWords } from '@/utils/fetchWords';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CardData } from '@/types';
import WordCard from '@/app/[lang]/library/components/WordCard';
import { Box, InputBase, Pagination, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@/app/[lang]/library/components/Badge';
import debounce from 'lodash/debounce';

export default function Library() {
	const { accessToken = '' } = useCredentials();

	const [isFetching, setIsFetching] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const [words, setWords] = useState<CardData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState('');
	const [pageSize] = useState<number>(25);
	const [foundedWords, setFoundedWords] = useState<number>(0);
	const [totalWords, setTotalWords] = useState<number>(0);

	useEffect(() => {
		// setIsFetching(true);
		fetchWords(accessToken, { randomize: false, pageSize, page, search })
			.then(response => {
				if(!response.ok) {
					throw new Error('Something went wrong');
				}
				return response.json();
			})
			.then(result => {
				setWords(result.data);
				setTotalWords(result.total);
				setFoundedWords(result.founded)
			})
			.catch(error => console.log(error))
			.finally(() => setIsFetching(false));
	}, [accessToken, page, search]);

	const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchValue(e.target.value);
		debounceFn(e.target.value.trim());
	}

	const debounceFn = useCallback(debounce(async (value: string) => {
		setSearch(value);
	}, 1000), []);

	const changePage = (_e: any, page: number) => {
		setPage(page);
	}

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
					<Box display="flex" gap="4px" width="80%">
						<InputBase
							sx={{ border: '1px solid gray', borderRadius: '10px', fontSize: '16px', padding: '2px 12px', fontFamily: "Montserrat", width: "500px", my: '10px' }}
							placeholder="Find your word..."
							value={ searchValue }
							onChange={ handleChangeInput }
						/>
					</Box>
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
						count={ Math.ceil(foundedWords / pageSize) }
						shape="rounded"
						onChange={ changePage }
						variant="outlined"
					/>
				</>
			) }
		</Box>
	);
};