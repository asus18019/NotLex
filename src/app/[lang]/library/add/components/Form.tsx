'use client'
import { Autocomplete, Button, FormControl, styled, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { SearchParamsType } from '@/types';
import { NewWordSchema, NewWordSchemaType } from '@/types/schemas';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useCredentials } from '@/hooks/useCredentials';
import { useCategories } from '@/hooks/useCategories';
import { useAlertModal } from '@/hooks/useAlertModal';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';
import { zodResolver } from '@hookform/resolvers/zod';

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

const ErrorText = styled('p')({
	color: 'red'
});

export default function Form({ searchParams }: { searchParams: SearchParamsType }) {
	const { lang } = useContext(LangContext);
	const { page: { library: { addPage: page } } } = getDictionary(lang);
	const router = useRouter();
	const { accessToken } = useCredentials();
	const { categories } = useCategories();
	const { alertModal, handleShowModal } = useAlertModal();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
		reset
	} = useForm<NewWordSchemaType>({
		defaultValues: {
			word: searchParams.word?.toString() || '',
			category: '',
			meaning: searchParams.definition?.toString() || '',
			example: searchParams.example?.toString() || '',
		},
		resolver: zodResolver(NewWordSchema)
	});

	const handleAddWord = async ({ word, category, example, meaning }: NewWordSchemaType) => {
		try {
			const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/word`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ accessToken }`
				},
				body: JSON.stringify({
					data: { word, category: [category], meaning, example }
				})
			});

			if(!response.ok) throw new Error();

			handleShowModal(page.form.modal.success, 'success');
			reset();
			router.push(`/${ lang }/library/add`);
		} catch(e) {
			handleShowModal(page.form.modal.error, 'error');
			console.log(e);
		}
	};

	const onAutocompleteChange = (_event: any, value: string | null) => {
		setValue("category", value || '', { shouldValidate: true })
	}

	return (
		<FormControl sx={ { my: '25px', width: '310px' } } component="form" onSubmit={ handleSubmit(handleAddWord) }>
			{ alertModal }
			<FormInput{ ...register("word") } placeholder={ page.form.placeholders.word }/>
			{ errors.word && <ErrorText>{ errors.word.message }</ErrorText> }

			<Autocomplete
				sx={ { mt: '20px' } }
				options={ categories.map(elem => elem.title) }
				disableClearable={ true }
				freeSolo={ true }
				value={ getValues("category") }
				onChange={ onAutocompleteChange }
				inputValue={ getValues("category") }
				onInputChange={ onAutocompleteChange }
				renderInput={ (params) => (
					<div ref={ params.InputProps.ref }>
						<FormInput
							sx={ { width: 'calc(100% - 32px)' } }
							type="text"
							{ ...params.inputProps }
							placeholder={ page.form.placeholders.category }
						/>
					</div>
				) }
			/>
			{ errors.category && <ErrorText>{ errors.category.message }</ErrorText> }

			<FormText{ ...register("meaning") } placeholder={ page.form.placeholders.meaning } rows={ 3 }/>
			{ errors.meaning && <ErrorText>{ errors.meaning.message }</ErrorText> }

			<FormText{ ...register("example") } placeholder={ page.form.placeholders.example } rows={ 5 }/>
			{ errors.example && <ErrorText>{ errors.example.message }</ErrorText> }

			<Button sx={ { mt: '25px' } } variant="contained" type="submit" disabled={ isSubmitting } fullWidth>
				{ isSubmitting ? (
					<CircularProgress size={ 24 }/>
				) : (
					<Typography fontFamily="Montserrat">{ page.form.button.submit }</Typography>
				) }
			</Button>
		</FormControl>
	);
}