import { Typography } from '@mui/material';
import SearchForm from '@/app/search/components/SearchForm';
import { Metadata } from 'next';
import { DictionaryWordResult, ServerComponentPropsType } from '@/types';

export const metadata: Metadata = {
	title: 'Search | NotLex',
	description: 'Enter the word you want to find to get the meaning and example',
}

const fetchSearchWords = async (word: string): Promise<DictionaryWordResult[]> => {
    if(!word) return [];

    const res = await fetch('https://notlex-api.vercel.app/find-word?word=' + word);
    const data = await res.json();
    return data.data;
}

export default async function Search({ searchParams }: ServerComponentPropsType) {
    const searchParam = searchParams.search?.toString() || '';
    const searchWords = await fetchSearchWords(searchParam);

    return (
		<>
			<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>
				Enter the word you want to find...
			</Typography>
			<SearchForm data={ searchWords } searchParam={ searchParam } />
		</>
	);
};