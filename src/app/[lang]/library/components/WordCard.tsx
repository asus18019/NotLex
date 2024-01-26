import { Autocomplete, Box, styled, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@/app/[lang]/library/components/Badge';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { UpdateWordData, WordData } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';
import CircularProgress from '@mui/material/CircularProgress';
import TransparentInput from '@/app/[lang]/library/components/TransparentInput';
import { useCategories } from '@/hooks/useCategories';
import DeleteBadgeIcon from '@/app/[lang]/library/components/DeleteBadgeIcon';
import { updateWordQuery } from '@/utils/updateWordQuery';

const CardContainer = styled(Box)(({ theme }) => ({
	width: 'calc(100%-32px)',
	backgroundColor: 'lightcyan',
	padding: '15px',
	borderRadius: '10px',
	marginTop: '10px',
	[theme.breakpoints.up('md')]: {
		width: '700px'
	}
}));

const ContentText = styled(Typography)({
	fontFamily: 'Montserrat',
	fontSize: '14px',
	marginTop: '5px'
});

const addBadgeIconStyles = {
	cursor: "pointer",
	marginRight: "25px",
	marginLeft: "5px",
	transition: "0.15s",
	borderRadius: "50%",
	":hover": { backgroundColor: "rgba(173, 173, 173, 0.15)" }
};

const iconStyles = (color: string) => ({ transition: '0.15s', cursor: 'pointer', ':hover': { color } });

interface WordCardProps {
	id: number,
	word: string,
	progress: number,
	meaning: string,
	sentence: string,
	categories: string[],
	updateWordInList: (word: Required<WordData>) => void;
}

export default function WordCard({ id, word, progress, meaning, sentence, categories, updateWordInList }: WordCardProps) {
	const { accessToken = '' } = useCredentials();
	const { categories: syncedCategories } = useCategories();
	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newWord, setNewWord] = useState(word);
	const [newMeaning, setNewMeaning] = useState(meaning);
	const [newSentence, setNewSentence] = useState(sentence);
	const [newCategoryName, setNewCategoryName] = useState('');
	const [newCategories, setNewCategories] = useState(categories);

	const renderElement = (viewElement: ReactNode | ReactNode[], editElement: ReactNode) => {
		return editMode ? editElement : viewElement;
	}

	const handleUpdate = async () => {
		const updateData: UpdateWordData = {
			wordId: id,
			word: newWord.trim() !== word ? newWord.trim() : undefined,
			meaning: newMeaning.trim() !== meaning ? newMeaning.trim() : undefined,
			sentence: newSentence.trim() !== sentence ? newSentence.trim() : undefined,
			categories: newCategories.join() !== categories.join() ? newCategories : undefined
		};

		const changedProperties = Object.values(updateData).filter(value => value !== undefined).length - 1;

		if(changedProperties < 1) {
			handleCloseEditing();
			return;
		}

		try {
			setIsLoading(true);
			await updateWordQuery(updateData, accessToken);

			updateWordInList({
				wordId: updateData.wordId,
				word: updateData.word || word,
				meaning: updateData.meaning || meaning,
				sentence: updateData.sentence || sentence,
				translate: updateData.translate || '',
				progress: progress,
				categories: updateData.categories || categories
			});
			handleCloseEditing(true);
		} catch(e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCloseEditing = (saveChanges: boolean = false) => {
		setEditMode(false);
		setNewCategoryName('');
		if(saveChanges) return
		setNewWord(word);
		setNewMeaning(meaning);
		setNewSentence(sentence);
		setNewCategories(categories);
	}

	const handleAddCategory = () => {
		if(!newCategoryName) return;

		if(newCategories.includes(newCategoryName)) {
			setNewCategoryName('');
			return;
		}

		setNewCategories(prev => [...prev, newCategoryName.trim()]);
		setNewCategoryName('');
	}

	const handleDeleteCategory = (category: string) => {
		if(newCategories.length === 1) return;
		setNewCategories(prev => prev.filter(cat => cat !== category));
	}

	return (
		<CardContainer>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				{ renderElement(
					<Typography fontFamily="Montserrat" fontSize="16px" color="darkcyan" fontWeight="600">{ word }</Typography>,
					<TransparentInput value={ newWord } onChange={ setNewWord } styles={{ color: "darkcyan", fontWeight: "600", fontSize: "16px" }} />
				) }
				<Badge text={ `${ progress }%` } color="darkcyan" fontSize="15px"/>
			</Box>
			{ renderElement(
				<ContentText>{ meaning }</ContentText>,
				<TransparentInput value={ newMeaning } onChange={ setNewMeaning } styles={{ marginTop: "5px" }} />
			) }
			{ renderElement(
				<ContentText color="slategray">{ sentence }</ContentText>,
				<TransparentInput value={ newSentence } onChange={ setNewSentence } styles={{ color: "slategray", marginTop: "5px" }} />
			) }
			<Box mt="5px" display="flex" justifyContent="space-between" alignItems="center">
				<Box display="flex" flexWrap="wrap" gap="5px">
					{ renderElement(
						categories.map(category => (
							<Badge key={ category } text={ category } color="#e6ca02" fontSize="13px"/>
						)),
						<>
							{ newCategories.map(category => (
								<Badge key={ category } text={ category } color="#e6ca02" fontSize="13px" deleteIcon={
									<DeleteBadgeIcon itemId={ category } handleDelete={ handleDeleteCategory }/>
								}/>
							)) }
							<Box display="flex" alignContent="center">
								<Autocomplete
									freeSolo
									value={ newCategoryName }
									onInputChange={ (_e: SyntheticEvent, value: string) => setNewCategoryName(value) }
									sx={{ '.MuiOutlinedInput-root': { padding: 0 }, minWidth: "170px" }}
									options={ syncedCategories.filter(({ title }) => !newCategories.includes(title)).map(cat => cat.title) }
									renderInput={ (params) => <TextField
										{ ...params }
										inputProps={{ ...params.inputProps, style: { padding: "2px 8px", fontFamily: "Montserrat" } }}
									/> }
								/>
								<AddIcon onClick={ handleAddCategory } sx={ addBadgeIconStyles }/>
							</Box>
						</>
					) }
				</Box>
				<Box display="flex" gap="5px">
					{ isLoading ? (
						<CircularProgress size={ 24 } sx={{ color: "black" }}/>
					) : renderElement(
						<>
							<EditIcon sx={ iconStyles('#1ca1d4') } onClick={ () => setEditMode(prev => !prev) }/>
							<DeleteOutlineIcon sx={ iconStyles('red') }/>
						</>,
						<>
							<CheckIcon sx={ iconStyles('#49be25') } onClick={ () => handleUpdate() }/>
							<CloseIcon sx={ iconStyles('red') } onClick={ () => handleCloseEditing() }/>
						</>
					) }
				</Box>
			</Box>
		</CardContainer>
	);
};