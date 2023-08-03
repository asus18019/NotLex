'use client';
import { Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '16px',
	outline: 'none',
	padding: '12px 16px',
	borderRadius: '6px',
	border: '1px solid gray',
	':nth-child(2n)': {
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

export default function Form() {
	const searchParams = useSearchParams();

	const [isFetching, setIsFetching] = useState(false);

	const [word, setWord] = useState('');
	const [category, setCategory] = useState('');
	const [meaning, setMeaning] = useState('');
	const [example, setExample] = useState('');

	useEffect(() => {
		if(!searchParams) return;
		setWord(searchParams.get('word') || '');
		setMeaning(searchParams.get('definition') || '');
		setExample(searchParams.get('example') || '');
	}, [searchParams]);

	const handleAddWord = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const credentials = Cookies.get('credentials') || '';
		const { secret, database_id } = JSON.parse(credentials);
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