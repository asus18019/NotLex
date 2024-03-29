'use client';
import { Box, styled, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import Repeat, { LoadingText } from '@/app/[lang]/dashboard/components/Repeat';
import { CardData } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';
import GuessingProgram from '@/app/[lang]/dashboard/components/GuessingProgram';
import { programs } from '@/config/programs';
import SettingsIcon from '@mui/icons-material/Settings';
import Pairing from '@/app/[lang]/dashboard/components/Pairing';
import { LangContext } from '@/context/LangContextProvider';
import { getDictionary } from '@/utils/dictionary';
import Crossword from '@/app/[lang]/dashboard/components/Crossword';
import SettingsModal from '@/app/[lang]/dashboard/components/SettingsModal';
import { fetchWords } from '@/utils/fetchWords';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

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

const CenteredBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	minHeight: 'calc(100vh - 81px)',
	alignItems: 'center'
})

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
		right: 0
	}
}));

export default function ProgramSelector() {
	const firstRender = useRef(true);
	const { lang } = useContext(LangContext);
	const { page } = getDictionary(lang);
	const { accessToken = '' } = useCredentials();

	const [selectedProgram, setSelectedProgram] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const [isFetching, setIsFetching] = useState(true);
	const [isNoSavedWords, setIsNoSavedWords] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [words, setWords] = useState<CardData[]>([]);

	const activeWord = words[words.length - 1];
	const fetchNewWords = !isFetching && !words.length && !isNoSavedWords;

	useEffect(() => {
		if(firstRender.current) {
			firstRender.current = false;

			fetchWords(accessToken, { randomize: true })
				.then(response => {
					if(!response.ok) {
						throw new Error('Something went wrong');
					}
					return response.json();
				})
				.then(({ data }) => data.length ? setWords(data) : setIsNoSavedWords(true))
				.catch(error => console.log(error))
				.finally(() => setIsFetching(false));
			return;
		}

		if(fetchNewWords) {
			setIsFetching(true);
			fetchWords(accessToken, {
				...(selectedCategory.length && { category: [selectedCategory] }),
				randomize: true
			})
				.then(response => {
					if(!response.ok) {
						throw new Error('Something went wrong');
					}
					return response.json();
				})
				.then(({ data }) => data.length ? setWords([...data, ...words]) : setIsNoSavedWords(true))
				.catch(error => console.log(error))
				.finally(() => setIsFetching(false));
		}
	}, [fetchNewWords, selectedProgram]);

	const removeCard = (id: number, action?: 'right' | 'left') => {
		setWords((prev) => prev.filter(card => card.id !== id));

		if(!action) {
			return;
		} else if(action === 'right') {
			console.log('swapped right');
		} else {
			console.log('swapped left');
		}
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
		case ('Crossword') :
			return <Crossword { ...{ words, isFetching, removeCard, closeProgram } }/>;
		default:
			return null;
		}
	};

	if(isFetching) {
		return (
			<CenteredBox>
				<CircularProgress size={ 50 }/>
				<LoadingText fontSize={ { xs: 17, md: 17 } }>{ page.dashboard.loadingText }</LoadingText>
			</CenteredBox>
		)
	}

	if(isNoSavedWords) {
		return (
			<CenteredBox>
				<Typography fontFamily="Montserrat" fontWeight="600" fontSize={ 19 }>
					{ page.dashboard.notFoundText }
				</Typography>
				<Typography mt="10px" fontFamily="Montserrat" color="gray" fontWeight="500" fontSize={ 16 }>
					{ page.dashboard.notFoundSubtext1 }
					<Link href={ `/${ lang }/search` }>{ page.dashboard.notFoundSubtext2 }</Link>
					{ page.dashboard.notFoundSubtext3 }
					<Link href={ `/${ lang }/library/add` }>{ page.dashboard.notFoundSubtext4 }</Link>
					{ page.dashboard.notFoundSubtext5 }
				</Typography>
			</CenteredBox>
		);
	}

	if(selectedProgram) {
		return (
			<CenteredBox>
				{ selectProgram(selectedProgram) }
			</CenteredBox>
		)
	}

	return (
		<ProgramsContainer>
			<StyledSettingsIcon fontSize="large" onClick={ toggleModal }/>
			<SettingsModal { ...{ isModalOpen, toggleModal, selectedCategory, setSelectedCategory, setWords } }/>
			<Title zIndex={ 10 } fontSize={ { xs: '20px', md: '24px' } }>{ page.dashboard.title }</Title>
			<ProgramsBox>
				{ programs.map(program => {
					return (
						<MenuItem
							key={ program.label }
							onClick={ () => setSelectedProgram(program.name) }
							padding={ { xs: '15px 0', md: '15px 100px' } }
						>
							<Typography fontFamily="Montserrat" fontWeight="500" fontSize={ { xs: 17, md: 20 } }>
								{ page.dashboard.programs[program.label.toLowerCase()].name }
							</Typography>
						</MenuItem>
					);
				}) }
			</ProgramsBox>
		</ProgramsContainer>
	);
}