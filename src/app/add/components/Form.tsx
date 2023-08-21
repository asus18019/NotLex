'use client';
import { Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FormEvent, useState } from 'react';
import { SearchParamsType } from '@/types';
import { useRouter } from 'next/navigation';
import { useCredentials } from '@/hooks/useCredentials';

const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '16px',
	outline: 'none',
	padding: '12px 16px',
	borderRadius: '6px',
	border: '1px solid gray',
	':nth-of-type(2)': {
		marginTop: '20px'
	}
});

const FormText = styled('textarea')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '16px',
	outline: 'none',
	padding: '12px 16px',
	borderRadius: '6px',
	border: '1px solid gray',
	marginTop: '20px',
	resize: 'none'
});

const ADD_WORD_API_URL = 'https://notlex-api.vercel.app/word';

export default function Form({ searchParams }: { searchParams: SearchParamsType }) {
    const router = useRouter();
    const [secret, database_id] = useCredentials();

    const [isFetching, setIsFetching] = useState(false);

	const [word, setWord] = useState(searchParams.word || '');
	const [category, setCategory] = useState('');
	const [meaning, setMeaning] = useState(searchParams.definition || '');
	const [example, setExample] = useState(searchParams.example || '');

	const handleAddWord = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFetching(true);

		try {
			await fetch(ADD_WORD_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					credentials: { secret, database_id },
					data: { word, category: [category], meaning, example }
				})
			});

			setWord('');
			setCategory('');
			setMeaning('');
			setExample('');

            router.push('/add');
        } catch(e) {
			console.log(e);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<FormControl sx={ { my: '25px', width: '310px' } } component="form" onSubmit={ handleAddWord }>
			<FormInput
				placeholder="Word"
				type="text"
				value={ word }
				onChange={ e => setWord(e.target.value) }
				required
			/>
			<FormInput
				placeholder="Category"
				type="text"
				value={ category }
				onChange={ e => setCategory(e.target.value) }
				required
			/>
			<FormText
				placeholder="Meaning"
				rows={ 3 }
				required
				value={ meaning }
				onChange={ e => setMeaning(e.target.value) }
			/>
			<FormText
				placeholder="Example sentence"
				rows={ 5 }
				required
				value={ example }
				onChange={ e => setExample(e.target.value) }
			/>
			<Button sx={ { mt: '25px' } } variant="contained" type="submit" disabled={ isFetching } fullWidth>
				{ isFetching ? (
					<CircularProgress size={ 24 }/>
				) : (
					<Typography fontFamily="Montserrat">Save</Typography>
				) }
			</Button>
		</FormControl>
	);
}