'use client';
import { styled } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Definition, Sense } from '@/types';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
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

export default function SearchForm({ data, searchParam }: { data: Definition[], searchParam: string }) {
	const router = useRouter();
	const [isFetching, setIsFetching] = useState(false);

	const [searchValue, setSearchValue] = useState(searchParam);
	const [searchResults, setSearchResults] = useState<Definition[]>(data);

	const handleChangeInput = (value: string) => {
		setSearchValue(value);
		debounceFn(value);
	};

	const handleClickAddWord = (word: { definition: string, example: string }) => {
		const { definition, example } = word;
		router.push(`/add?word=${ searchValue }&definition=${ definition }${ example ? `&example=${ example }` : '' }`);
	};

	const debounceFn = useCallback(debounce(async (value: string) => {
		router.push(`/search${ value.trim() && `?search=${ value }` }`);

		if(!value.trim()) {
			setSearchResults([]);
			return;
		}

		setIsFetching(true);
		const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/find-word?word=` + value);
		const searchResult = await res.json();
		if(res.status === 200) {
			setSearchResults(searchResult);
		} else {
			setSearchResults([]);
		}
		setIsFetching(false);
	}, 1000), []);


	const renderDefinition = (definition: Sense) => {
		return definition.meanings?.map(word => {
			if(word === ':') return;
			const def = word
				.replace(': ', '')
				.charAt(0)
				.toUpperCase() + word.slice(3)
				.split(/([A-Z])/g)[0];
			return <WordResult
				key={ def }
				word={ { definition: def, example: definition.illustrations } }
				handleClickAddWord={ handleClickAddWord }
			/>;
		});
	};

	const renderResults = useMemo(() => {
		return searchResults?.map(result => result.definition.map(definition => {
			return renderDefinition(definition) || definition.senses?.map(sense => renderDefinition(sense));
		}));
	}, [searchResults]);

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
			) : renderResults }
		</>
	);
}
