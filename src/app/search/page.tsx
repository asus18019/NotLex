"use client"
import { Box, Container, Divider, styled, Typography } from '@mui/material';
import Nav from '@/app/components/Nav';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { DictionaryWordResult } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingText } from '@/app/components/programs/Repeat';
import Head from 'next/head';

const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '16px',
	marginTop: '10px',
	width: '100%',
	outline: 'none',
	padding: '8px 16px',
	borderRadius: '6px',
	color: 'black',
	border: '1px solid gray',
	'@media (max-width:900px)': {
		width: 'calc(100% - 32px)'
	}
});

export default function Search() {
	const router = useRouter();

	const [showMenu, setShowMenu] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const [searchValue, setSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState<DictionaryWordResult[]>([]);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	const handleChangeInput = (value: string) => {
		setSearchValue(value);
		debounceFn(value);
	};

	const handleClickAddWord = (word: { definition: string, example: string }) => {
		const { definition, example } = word;
		router.push(`/add?word=${ searchValue }&definition=${ definition }${ example ? `&example=${ example }` : '' }`);
	};

	const debounceFn = useCallback(debounce(async (value: string) => {
		if(!value.trim()) {
			setSearchResults([]);
			return;
		}

		setIsFetching(true);
		const res = await fetch('https://notlex-api.vercel.app/find-word?word=' + value);
		const searchResult = await res.json();
		if(res.status === 200) {
			setSearchResults(searchResult.data);
		} else {
			setSearchResults([]);
			console.log(searchResult);
		}
		setIsFetching(false);
	}, 1000), []);

	return (
		<>
			<Head>
				<title>NotLex | Search</title>
			</Head>
			<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
				<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
				<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>Enter the word you want to
					find...</Typography>
				<FormInput placeholder="Your search word" type="text" required value={ searchValue }
				           onChange={ e => handleChangeInput(e.target.value) }/>
				{ isFetching ? (
					<Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
						<CircularProgress size={ 50 }/>
						<LoadingText fontSize={ { xs: 17, md: 17 } }>Looking for your words...</LoadingText>
					</Box>
				) : searchResults && searchResults.map(res => {
					return res.meanings.map(re => {
						return re.definitions.map(word => {
							return (
								<>
									<Divider/>
									<Box py={ 2 } display="flex" alignItems="center">
										<AddIcon
											transform="scale(1.8)"
											sx={ { m: '0 20px 0 0', cursor: 'pointer' } }
											onClick={ () => handleClickAddWord(word) }
										/>
										<Box>
											<Typography
												fontFamily="Montserrat"
												margin="5px 0"
												fontSize="18px"
												fontWeight={ 600 }
											>
												{ word.definition }
											</Typography>
											<Typography
												fontFamily="Montserrat"
												margin="5px 0"
												fontSize="15px"
												fontWeight={ 300 }
												color="#000000a6"
											>
												{ word.example }
											</Typography>
										</Box>
									</Box>
								</>
							);
						});
					});
				})
				}
			</Container>
		</>
	);
};