'use client';
import { Autocomplete, Box, styled, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Repeat from '@/app/dashboard/components/Repeat';
import { CardData, CredentialsType } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';
import GuessingProgram from '@/app/dashboard/components/GuessingProgram';
import { programs } from '@/config/programs';
import Pairing from '@/app/dashboard/components/Pairing';
import Modal from '@/app/components/Modal';
import SettingsIcon from '@mui/icons-material/Settings';
import { useCategories } from '@/hooks/useCategories';

export const ProgramsContainer = styled(Box)({
	width: '100%',
	padding: '200px 0',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	textAlign: 'center',
	position: 'relative'
});

const MenuItem = styled(Box)({
	cursor: 'pointer',
	zIndex: 10,
	transition: '0.1s',
	':hover': {
		backgroundColor: 'rgb(9,102,210, 0.4)',
		color: 'white'
	},
	':first-of-type': {
		borderRadius: '30px 30px 0 0'
	},
	':last-child': {
		borderRadius: '0 0 30px 30px'
	}
});

const Title = styled(Typography)({
	fontWeight: '700',
	fontFamily: 'Montserrat',
	textAlign: 'center',
	color: 'rgba(0,0,0,0.81)'
});

const ProgramsBox = styled(Box)(({ theme }) => ({
	marginTop: '50px',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	alignSelf: 'center',
	textAlign: 'center',
	borderRadius: '30px',
	width: '95%',
	backgroundColor: 'rgb(9,102,210, 0.15)',
	boxShadow: 'none',
	[theme.breakpoints.up('md')]: {
		width: '50%',
		boxShadow: '0 0 100px 10px rgb(9,102,210, 0.4)'
	}
}));

const StyledSettingsIcon = styled(SettingsIcon)(({ theme }) => ({
	padding: '6px',
	borderRadius: '50%',
	transition: '0.2s',
	cursor: 'pointer',
	position: 'absolute',
	top: 25,
	right: 25,
	color: 'gray',
	':hover': {
		backgroundColor: '#eeeeee'
	},
	[theme.breakpoints.down('md')]: {
		top: '16px',
		right: 0,
	}
}));

async function fetchData({ secret, database_id }: CredentialsType, category?: string) {
	const categoryQueryParam = category?.length ? `&category=${ category }` : '';
	const data = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/words?secret=${ secret }&database_id=${ database_id }${ categoryQueryParam }`, {
		method: 'GET'
	});

	if(data.ok) {
		return await data.json();
	}
	throw new Error('Something went wrong');
}

export default function ProgramSelector() {
	const firstRender = useRef(true);
	const [secret, database_id] = useCredentials();
	const { categories } = useCategories();

	const [selectedProgram, setSelectedProgram] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const [isFetching, setIsFetching] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [words, setWords] = useState<CardData[]>([]);

	const activeWord = words[words.length - 1];
	const fetchNewWords = !isFetching && !words.length;

	useEffect(() => {
		if(firstRender.current) {
			firstRender.current = false;

			fetchData({ secret, database_id })
				.then(response => setWords(response.data))
				.catch(error => console.log(error))
				.finally(() => setIsFetching(false));
			return;
		}

		if(fetchNewWords) {
			setIsFetching(true);
			fetchData({ secret, database_id }, selectedCategory)
				.then(response => setWords([...response.data, ...words]))
				.catch(error => console.log(error))
				.finally(() => setIsFetching(false));
		}
	}, [fetchNewWords, selectedProgram]);

	const removeCard = (id: string, action?: 'right' | 'left') => {
		setWords((prev) => prev.filter((card) => card.id !== id));

		if(!action) {
			return;
		} else if(action === 'right') {
			console.log('swapped right');
		} else {
			console.log('swapped left');
		}
	};

	const handleChangeCategoryAutocomplete = <T, >(_event: SyntheticEvent, value: T | T[]) => {
		if(typeof value !== 'string') return;
		if(value === selectedCategory) return;
		setWords([]); // Clear the current words to start fetching new words with a category filter applied.
		setSelectedCategory(value || '');
	};

	const closeProgram = () => setSelectedProgram('');
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const selectProgram = (program: string) => {
		switch(program) {
		case ('Repeat') :
			return <Repeat { ...{ words, activeWord, removeCard, isFetching, closeProgram } }/>;
		case ('GuessMeaning') :
			return <GuessingProgram { ...{ words, activeWord, removeCard, isFetching, closeProgram, type: program } }/>;
		case ('GuessWord') :
			return <GuessingProgram { ...{ words, activeWord, removeCard, isFetching, closeProgram, type: program } }/>;
		case ('Pairing') :
			return <Pairing { ...{ words, removeCard, isFetching, closeProgram } }/>;
		default:
			return null;
		}
	};

	return !selectedProgram ? (
		<ProgramsContainer>
			<StyledSettingsIcon fontSize="large" onClick={ toggleModal }/>
			<Modal isOpen={ isModalOpen } toggleModal={ toggleModal }>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography fontFamily="Montserrat">Category:</Typography>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						sx={ { width: '50%' } }
						options={ categories.map(elem => elem.name) }
						value={ selectedCategory }
						onChange={ handleChangeCategoryAutocomplete }
						onInputChange={ (_event, value) => {
							if(categories.some(category => category.name === value) || value === "") {
								handleChangeCategoryAutocomplete(_event, value)
							}
						}}
						renderInput={ (params) => <TextField ref={params.InputProps.ref  } { ...params } fullWidth/> }
					/>
				</Box>
				<Typography mt={ 2 } letterSpacing={ 0.8 } color="gray" fontSize="15px">Leave the Category field empty
					to disable filtering by category</Typography>
			</Modal>
			<Title zIndex={ 10 } fontSize={ { xs: '20px', md: '24px' } }>Please select a program</Title>
			<ProgramsBox>
				{ programs.map(program => {
					return (
						<MenuItem onClick={ () => setSelectedProgram(program.name) }
						          padding={ { xs: '15px 0', md: '15px 100px' } } key={ program.label }>
							<Typography fontFamily="Montserrat" fontWeight="500"
							            fontSize={ { xs: 17, md: 20 } }>{ program.label }</Typography>
						</MenuItem>
					);
				}) }
			</ProgramsBox>
		</ProgramsContainer>
	) : selectProgram(selectedProgram);
}