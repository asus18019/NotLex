import { Typography } from '@mui/material';
import { Metadata } from 'next';
import { Definition, ServerComponentPropsType } from '@/types';
import SearchForm from './components/SearchForm';

export const metadata: Metadata = {
	title: 'Search | NotLex',
	description: 'Enter the word you want to find to get the meaning and example',
}

const fetchSearchWords = async (word: string): Promise<Definition[]> => {
    if(!word) return [];

	const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/find-word?word=` + word);
    const data = await res.json();
	if(data.error === 'Error') return [];
    return data;
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