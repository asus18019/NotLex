'use client';
import { useCredentials } from '@/hooks/useCredentials';
import Link from 'next/link';
import { fetchWords } from '@/utils/fetchWords';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CardData } from '@/types';
import WordCard from '@/app/[lang]/library/components/WordCard';
import {
	Box,
	InputBase,
	Pagination,
	styled,
	Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@/app/[lang]/library/components/Badge';
import debounce from 'lodash/debounce';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Select from '@/app/[lang]/library/components/Select';
import { Locale } from '../../../../../i18n.config';
import { getDictionary } from '@/utils/dictionary';

const PageContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	marginTop: '10px',
	flexDirection: 'column',
	minHeight: '80vh'
});

const SearchInput = styled(InputBase)(({ theme }) => ({
	border: '1px solid gray',
	borderRadius: '10px',
	fontSize: '16px',
	padding: '2px 12px',
	fontFamily: 'Montserrat',
	width: '100%',
	margin: '4px 0',
	[theme.breakpoints.up('md')]: {
		margin: '10px 0',

	}
}));

const LibraryHeader = styled(Typography)(({ theme }) => ({
	fontFamily: "Montserrat",
	fontSize: "18px",
	width: '100%',
	textAlign: 'start',
	[theme.breakpoints.up('md')]: {
		width: '80%',
		textAlign: 'center'
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

const iconStyles = {
	color: 'black',
	m: '0 0 0 8px',
	p: '4px',
	cursor: 'pointer',
	transition: 'all 0.25s',
	':hover': { backgroundColor: '#ebebeb', borderRadius: '100%' }
}

type SortByType = 'progress' | 'created_at' | 'word';
type OrderByType = 'asc' | 'desc'

interface ContentProps {
	lang: Locale
}

export default function Content({ lang }: ContentProps) {
	const { page: { library: libraryPage } } = getDictionary(lang);
	const { accessToken = '' } = useCredentials();

	const [isFetching, setIsFetching] = useState(true);
	const [showFiltering, setShowFiltering] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [sortBy, setSortBy] = useState<SortByType>('created_at');
	const [orderBy, setOrderBy] = useState<OrderByType>('desc');

	const [words, setWords] = useState<CardData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState('');
	const [pageSize, setPageSize] = useState<number>(25);
	const [foundedWords, setFoundedWords] = useState<number>(0);
	const [totalWords, setTotalWords] = useState<number>(0);

	useEffect(() => {
		setIsFetching(true);
		fetchWords(accessToken, { randomize: false, pageSize, page, search, sortBy, orderBy })
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
	}, [accessToken, page, pageSize, search, sortBy, orderBy]);

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
			<Box display="flex" alignItems="center" gap="4px" width={ { xs: '100%', md: '80%' } }>
				<Typography fontFamily="Montserrat" fontSize="16px" fontWeight="600">Total:</Typography>
				<Badge text={ totalWords.toString() } color="darkcyan" fontSize="15px"/>
				<Typography fontFamily="Montserrat" fontSize="16px">words saved</Typography>
			</Box>
			<LibraryHeader>{ libraryPage.header }</LibraryHeader>
			<Box display="flex" flexDirection="column" width={ { xs: '100%', md: '500px' } }>
				<Box display="flex" alignItems="center">
					<SearchInput
						placeholder={ libraryPage.searchInputPlaceholder }
						value={ searchValue }
						onChange={ handleChangeInput }
						endAdornment={ <ClearIcon sx={ iconStyles } onClick={ handleClearSearch }/> }
					/>
					<FilterListIcon sx={ iconStyles } onClick={ () => setShowFiltering(!showFiltering) }/>
					<Link href="/library/add">
						<AddIcon sx={ iconStyles }/>
					</Link>
				</Box>
				{ showFiltering && (
					<Box alignSelf="center">
						<Select value={ sortBy } onChange={ e => setSortBy(e.target.value as SortByType) }>
							<option value="created_at">{ libraryPage.filters.sorts.created_at }</option>
							<option value="word">{ libraryPage.filters.sorts.word }</option>
							<option value="progress">{ libraryPage.filters.sorts.progress }</option>
						</Select>
						<Select value={ orderBy } onChange={ e => setOrderBy(e.target.value as OrderByType) }>
							<option value="asc">{ libraryPage.filters.orders.asc }</option>
							<option value="desc">{ libraryPage.filters.orders.desc }</option>
						</Select>
						<Select value={ pageSize.toString() } onChange={ e => setPageSize(Number(e.target.value)) }>
							<option value={ 5 }>5</option>
							<option value={ 10 }>10</option>
							<option value={ 25 }>25</option>
							<option value={ 50 }>50</option>
							<option value={ 100 }>100</option>
						</Select>
					</Box>
				) }
			</Box>
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
				<NotFoundText>We haven`&apos;t found any words... Try to add a new one or clear the
					filters</NotFoundText>
			) }
		</PageContainer>
	);
};