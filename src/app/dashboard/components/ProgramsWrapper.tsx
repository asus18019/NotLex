"use client"
import { Box, styled, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Repeat from '@/app/dashboard/components/Repeat';
import { CardData } from '@/types';
import Cookies from 'js-cookie';

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
	':first-child': {
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
	justifyContent: "center",
	flexDirection: "column",
	alignSelf: "center",
	textAlign: "center",
	borderRadius: '30px',
	width: '95%',
	backgroundColor: "rgb(9,102,210, 0.15)",
	boxShadow: 'none',
	[theme.breakpoints.up("md")]: {
		width: '50%',
		boxShadow: '0 0 100px 10px rgb(9,102,210, 0.4)',
	}
}));

const api_url = 'https://notlex-api.vercel.app/words';

async function fetchData() {
	const credentials = Cookies.get('credentials') || '';
	const { secret, database_id } = JSON.parse(credentials);

	const data = await fetch(api_url + `?secret=${ secret }&database_id=${ database_id }`, {
		method: 'GET'
	});
	const apiRes = await data.json();
	return apiRes.data;
}

const programs = ['Repeat', 'Guess the word', 'Guess the meaning'];

export default function ProgramsWrapper() {
	const firstRender = useRef(true);
	const [selectedProgram, setSelectedProgram] = useState('');

	const [isFetching, setIsFetching] = useState(true);
	const [words, setWords] = useState<CardData[]>([]);

	const activeWord = words[words.length - 1];
	let fetchNewWords = words.length <= 5;
	let temp: CardData[] = [];

	useEffect(() => {
		if(firstRender.current) {
			firstRender.current = false;

			fetchData()
				.then(data => setWords(data))
				.finally(() => setIsFetching(false));
			return;
		}

		if(fetchNewWords) {
			fetchData()
				.then(data => temp = data)
				.finally(() => setIsFetching(false));
			fetchNewWords = false;
		}
	}, [fetchNewWords]);

	const removeCard = (id: string, action: 'right' | 'left') => {
		setWords((prev) => prev.filter((card) => card.id !== id));

		if(temp.length) {
			setWords((prev) => [...prev, ...temp]);
		}

		if(action === 'right') {
			console.log('swapped right');
		} else {
			console.log('swapped left');
		}
	};

	const selectProgram = (program: string) => {
		switch(program) {
		case ('Repeat') :
			return <Repeat words={ words } activeWord={ activeWord } removeCard={ removeCard } isFetching={ isFetching }/>;
		default:
			return null;
		}
	};

	return (
		<>
			{ !selectedProgram ? (
				<ProgramsContainer>
					<Title zIndex={ 10 } fontSize={ { xs: '20px', md: '24px' } }>Please select a program</Title>
					<ProgramsBox>
						{ programs.map(program => {
							return (
								<MenuItem onClick={ () => setSelectedProgram(program) }
								          padding={ { xs: '15px 0', md: '15px 100px' } } key={ program }>
									<Typography fontFamily="Montserrat" fontWeight="500"
									            fontSize={ { xs: 17, md: 20 } }>{ program }</Typography>
								</MenuItem>
							);
						}) }
					</ProgramsBox>
				</ProgramsContainer>
			) : selectProgram(selectedProgram)
			}
		</>
	);
}