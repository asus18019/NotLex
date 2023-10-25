'use client';
import { Autocomplete, Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FormEvent, useContext, useState } from 'react';
import { SearchParamsType } from '@/types';
import { useRouter } from 'next/navigation';
import { useCredentials } from '@/hooks/useCredentials';
import { useCategories } from '@/hooks/useCategories';
import { useAlertModal } from '@/hooks/useAlertModal';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';

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

export default function Form({ searchParams }: { searchParams: SearchParamsType }) {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	const router = useRouter();
	const [secret, database_id] = useCredentials();
	const { categories } = useCategories();
	const { alertModal, handleShowModal } = useAlertModal();

	const [isFetching, setIsFetching] = useState(false);

	const [word, setWord] = useState(searchParams.word || '');
	const [category, setCategory] = useState('');
	const [meaning, setMeaning] = useState(searchParams.definition || '');
	const [example, setExample] = useState(searchParams.example || '');

	const handleAddWord = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFetching(true);

		try {
			const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/word`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					credentials: { secret, database_id },
					data: { word, category: [category], meaning, example }
				})
			});

			if(!response.ok) throw new Error();

			handleShowModal(page.add.form.modal.success, 'success');

			setWord('');
			setCategory('');
			setMeaning('');
			setExample('');

			router.push(`/${ lang }/add`);
		} catch(e) {
			handleShowModal(page.add.form.modal.error, 'error');
			console.log(e);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<FormControl sx={ { my: '25px', width: '310px' } } component="form" onSubmit={ handleAddWord }>
			{ alertModal }
			<FormInput
				placeholder={ page.add.form.placeholders.word }
				type="text"
				value={ word }
				onChange={ e => setWord(e.target.value) }
				required
			/>
			<Autocomplete
				sx={ { mt: '20px' } }
				options={ categories.map(elem => elem.name) }
				disableClearable={ true }
				freeSolo={ true }
				value={ category }
				onChange={ (_event: any, value: string | null) => {
					setCategory(value || '');
				} }
				inputValue={ category }
				onInputChange={ (_event: any, value: string | null) => {
					setCategory(value || '');
				} }
				renderInput={ (params) => (
					<div ref={ params.InputProps.ref }>
						<FormInput
							sx={ { width: 'calc(100% - 32px)' } }
							type="text"
							{ ...params.inputProps }
							placeholder={ page.add.form.placeholders.category }
							required/>
					</div>
				) }
			/>
			<FormText
				placeholder={ page.add.form.placeholders.meaning }
				rows={ 3 }
				required
				value={ meaning }
				onChange={ e => setMeaning(e.target.value) }
			/>
			<FormText
				placeholder={ page.add.form.placeholders.example }
				rows={ 5 }
				required
				value={ example }
				onChange={ e => setExample(e.target.value) }
			/>
			<Button sx={ { mt: '25px' } } variant="contained" type="submit" disabled={ isFetching } fullWidth>
				{ isFetching ? (
					<CircularProgress size={ 24 }/>
				) : (
					<Typography fontFamily="Montserrat">{ page.add.form.button.submit }</Typography>
				) }
			</Button>
		</FormControl>
	);
}