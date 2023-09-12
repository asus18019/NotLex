'use client';
import { Box, styled, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Repeat from '@/app/dashboard/components/Repeat';
import { CardData, CredentialsType } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';
import GuessingProgram from '@/app/dashboard/components/GuessingProgram';
import { programs } from '@/config/programs';
import Pairing from '@/app/dashboard/components/Pairing';

export const ProgramsContainer = styled(Box)({
	width: '100%',
	padding: '200px 0',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	textAlign: 'center'
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

async function fetchData({ secret, database_id }: CredentialsType) {
	const data = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/words?secret=${ secret }&database_id=${ database_id }`, {
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

	const [selectedProgram, setSelectedProgram] = useState('');

	const [isFetching, setIsFetching] = useState(true);
	const [words, setWords] = useState<CardData[]>([]);

	const activeWord = words[words.length - 1];
	const fetchNewWords = !words.length;

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
			fetchData({ secret, database_id })
				.then(response => setWords([...response.data, ...words]))
				.catch(error => console.log(error))
				.finally(() => setIsFetching(false));
		}
	}, [fetchNewWords]);

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

	const closeProgram = () => setSelectedProgram('');

	const selectProgram = (program: string) => {
		switch(program) {
		case ('Repeat') :
			return <Repeat { ...{ words, activeWord, removeCard, isFetching, closeProgram } }/>;
		case ('GuessMeaning') :
			return <GuessingProgram { ...{ words, activeWord, removeCard, isFetching, closeProgram, type: program } }/>
		case ('GuessWord') :
			return <GuessingProgram { ...{ words, activeWord, removeCard, isFetching, closeProgram, type: program } }/>
		case ('Pairing') :
			return <Pairing { ...{ words, removeCard, isFetching, closeProgram } }/>
		default:
			return null;
		}
	};

	return !selectedProgram ? (
		<ProgramsContainer>
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