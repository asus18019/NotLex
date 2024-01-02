import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { WORDS_PER_CROSSWORD_PAGE_OPTIONS } from '@/config/dashboardSettings';
import Modal from '@/app/[lang]/components/Modal';
import { Dispatch, SetStateAction, SyntheticEvent, useContext, useState } from 'react';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';
import { useSettings } from '@/hooks/useSettings';
import { useCategories } from '@/hooks/useCategories';
import { CardData } from '@/types';

interface SettingsModalProps {
	isModalOpen: boolean,
	toggleModal: () => void,
	selectedCategory: string,
	setSelectedCategory: Dispatch<SetStateAction<string>>,
	setWords: Dispatch<SetStateAction<CardData[]>>
}

const SettingsModal = ({ isModalOpen, toggleModal, selectedCategory, setSelectedCategory, setWords }: SettingsModalProps) => {
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	const { categories } = useCategories();
	const { wordsPerCrossword, setWordsPerCrossword } = useSettings();

	const [selectedWordsPerCrossword, setSelectedWordsPerCrossword] = useState<number>(wordsPerCrossword);

	const handleChangeCategoryAutocomplete = <T, >(_event: SyntheticEvent, value: T | T[]) => {
		if(typeof value !== 'string') return;
		if(value === selectedCategory) return;
		setWords([]); // Clear the current words to start fetching new words with a category filter applied.
		setSelectedCategory(value || '');
	};

	const handleChangeCrosswordWordsAutocomplete = <T, >(_event: SyntheticEvent, value: T | T[]) => {
		if(typeof value !== 'number') return;
		setWordsPerCrossword(value);
		setSelectedWordsPerCrossword(value);
	};

	return (
		<Modal isOpen={ isModalOpen } toggleModal={ toggleModal }>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography fontFamily="Montserrat">{ page.dashboard.settings.options.category + ':' }</Typography>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					sx={ { width: '50%' } }
					options={ categories.map(elem => elem.title) }
					value={ selectedCategory }
					onChange={ handleChangeCategoryAutocomplete }
					onInputChange={ (_event, value) => {
						if(categories.some(category => category.title === value) || value === "") {
							handleChangeCategoryAutocomplete(_event, value)
						}
					}}
					renderInput={ (params) => <TextField ref={params.InputProps.ref  } { ...params } fullWidth/> }
				/>
			</Box>
			<Typography mt={ 1 } mb={ 3 } letterSpacing={ 0.8 } color="gray" fontSize="15px">
				{ page.dashboard.settings.options.description }
			</Typography>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography fontFamily="Montserrat">{ page.dashboard.settings.options.wordsPerCrossword + ':' }</Typography>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					sx={ { width: '50%' } }
					options={ WORDS_PER_CROSSWORD_PAGE_OPTIONS }
					value={ selectedWordsPerCrossword }
					onChange={ handleChangeCrosswordWordsAutocomplete }
					onInputChange={ (_event, value) => handleChangeCrosswordWordsAutocomplete(_event, value) }
					renderInput={ (params) => <TextField ref={params.InputProps.ref  } { ...params } fullWidth/> }
				/>
			</Box>
		</Modal>
	);
};

export default SettingsModal;