"use client"
import { Divider, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { DictionaryWordResult } from '@/types';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import Loader from '@/app/search/components/Loader';
import WordResult from '@/app/search/components/WordResult';

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

export default function SearchForm() {
	// const router = useRouter();
	const [isFetching, setIsFetching] = useState(false);

	const [searchValue, setSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState<DictionaryWordResult[]>([]);

	const handleChangeInput = (value: string) => {
		setSearchValue(value);
		debounceFn(value);
	};

	const handleClickAddWord = (word: { definition: string, example: string }) => {
		const { definition, example } = word;
		// router.push(`/add?word=${ searchValue }&definition=${ definition }${ example ? `&example=${ example }` : '' }`);
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
			<FormInput
				placeholder="Your search word"
				type="text"
				required
				value={ searchValue }
				onChange={ e => handleChangeInput(e.target.value) }
			/>
			{ isFetching ? (
				<Loader/>
			) : searchResults && searchResults.map(res => {
				return res.meanings.map(re => {
					return re.definitions.map(word => {
						return (
							<>
								<Divider/>
								<WordResult
									word={ word }
									handleClickAddWord={ handleClickAddWord }
								/>
							</>
						);
					});
				});
			})
			}
		</>
	);
}
