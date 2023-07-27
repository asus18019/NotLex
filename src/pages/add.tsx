import Nav from '@/components/Nav';
import { FormEvent, useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, styled, Typography } from '@mui/material';
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

const ADD_WORD_API_URL = "https://notlex-api.vercel.app/word";

export const Add = () => {
	const searchParams = useSearchParams();

	const [showMenu, setShowMenu] = useState(false);
	const [word, setWord] = useState('');
	const [category, setCategory] = useState('');
	const [meaning, setMeaning] = useState('');
	const [example, setExample] = useState('');

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

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

		const response = await fetch(ADD_WORD_API_URL, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				credentials: {
					secret,
					database_id
				},
				data: {
					word,
					category: [category],
					meaning,
					example
				}
			})
		});

		if(response.ok) {
			setWord('');
			setCategory('');
			setMeaning('');
			setExample('');
		}
	}

	return (
		<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) } />
			<Box width='100%' height="calc(100vh - 81px)" display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
				<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>
					Add new word
				</Typography>
				<form onSubmit={ handleAddWord }>
					<FormControl sx={ { my: '25px' } } fullWidth>
						<FormInput placeholder="Word" type="text" value={ word } onChange={ e => setWord(e.target.value) } required/>
						<FormInput placeholder="Category" type="text" value={ category } onChange={ e => setCategory(e.target.value) } required/>
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
					</FormControl>
					<Button variant="contained" type="submit" fullWidth>
						<Typography fontFamily="Montserrat">Save</Typography>
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default Add;