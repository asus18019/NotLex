import { Typography } from '@mui/material';
import SearchForm from '@/app/search/components/SearchForm';

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