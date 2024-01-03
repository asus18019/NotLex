'use client';
import { useCredentials } from '@/hooks/useCredentials';
import Link from 'next/link';
import { fetchWords } from '@/utils/fetchWords';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CardData } from '@/types';
import WordCard from '@/app/[lang]/library/components/WordCard';
import { Box, InputBase, Pagination, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@/app/[lang]/library/components/Badge';
import debounce from 'lodash/debounce';
import ClearIcon from '@mui/icons-material/Clear';

const PageContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	marginTop: "10px",
	flexDirection: "column",
	minHeight: "80vh"
});

const SearchInput = styled(InputBase)(({ theme }) => ({
	border: '1px solid gray',
	borderRadius: '10px',
	fontSize: '16px',
	padding: '2px 12px',
	fontFamily: 'Montserrat',
	width: '100%',
	margin: '10px 0',
	[theme.breakpoints.up('md')]: {
		width: '500px'
	}
}));

const NotFoundText = styled(Typography)(({ theme }) => ({
	marginTop: '10px',
	fontFamily: 'Montserrat',
	fontSize: '15px',
	color: 'gray',
	width: '100%',
	[theme.breakpoints.up('md')]: {
		width: '80%'
	}
}));

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
		setIsFetching(true);
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
				setFoundedWords(result.founded);
			})
			.catch(error => console.log(error))
			.finally(() => setIsFetching(false));
	}, [accessToken, page, search]);

	const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchValue(e.target.value);
		debounceFn(e.target.value.trim());
	};

	const debounceFn = useCallback(debounce(async (value: string) => {
		setSearch(value);
		setPage(1);
	}, 1000), []);

	const changePage = (_e: any, page: number) => {
		setPage(page);
	};

	const handleClearSearch = () => {
		setSearchValue('');
		setSearch('');
	};

	return (
		<PageContainer>
			<Link href="/library/add">Add</Link>
			<Box display="flex" alignItems="center" gap="4px" width={ { xs: '100%', md: '80%' } }>
				<Typography fontFamily="Montserrat" fontSize="16px" fontWeight="600">Total:</Typography>
				<Badge text={ totalWords.toString() } color="darkcyan" fontSize="15px"/>
				<Typography fontFamily="Montserrat" fontSize="16px">words saved</Typography>
			</Box>
			<Typography fontFamily="Montserrat" fontSize="18px">Explore your saved words</Typography>
			<SearchInput
				placeholder="Find your word..."
				value={ searchValue }
				onChange={ handleChangeInput }
				endAdornment={ <ClearIcon sx={ { cursor: 'pointer' } } onClick={ handleClearSearch }/> }
			/>
			<Box>
				{ isFetching ? (
					<CircularProgress sx={ { mt: '10px' } }/>
				) : words.map(word => <WordCard
					key={ word.id }
					word={ word.word }
					progress={ word.progress }
					meaning={ word.meaning }
					sentence={ word.sentence }
					categories={ word.word_category }
				/>) }
			</Box>
			{ (!isFetching && foundedWords > pageSize) && (
				<Pagination
					sx={ { m: '15px 0 30px 0' } }
					page={ page }
					defaultPage={ 1 }
					count={ Math.ceil(foundedWords / pageSize) }
					shape="rounded"
					onChange={ changePage }
					variant="outlined"
				/>
			) }
			{ (!isFetching && words.length === 0) && (
				<NotFoundText>We haven`&apos;t found any words... Try to add a new one or clear the filters</NotFoundText>
			) }
		</PageContainer>
	);
};