import { Typography } from '@mui/material';
import SearchForm from '@/app/search/components/SearchForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Search | NotLex',
	description: 'Enter the word you want to find to get the meaning and example',
}

export default function Search() {
	return (
		<>
			<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>
				Enter the word you want to find...
			</Typography>
			<SearchForm/>
		</>
	);
};