import { Box, Container, Divider, styled, Typography } from '@mui/material';
import Nav from '@/components/Nav';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { DictionaryWordResult } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

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

export const Search = () => {
	const router = useRouter();

	const [showMenu, setShowMenu] = useState(false);
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

		const res = await fetch('https://notlex-api.vercel.app/find-word?word=' + value);
		const searchResult = await res.json();
		if(res.status === 200) {
			setSearchResults(searchResult.data);
		} else {
			setSearchResults([]);
			console.log(searchResult);
		}
	}, 1000), []);

	return (
		<Container maxWidth="lg" sx={ { px: { xs: 0, md: 'auto' } } }>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Typography fontFamily="Montserrat" fontSize={ 18 } marginTop={ 3 }>Enter the word you want to
				find...</Typography>
			<FormInput placeholder="Your search word" type="text" required value={ searchValue }
			           onChange={ e => handleChangeInput(e.target.value) }/>
			{ searchResults && searchResults.map(res => {
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

	);
};

export default Search;