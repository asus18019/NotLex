'use client';
import Nav from '@/app/components/Nav';
import { Box, Button, Container, styled, Typography, Divider, CardMedia } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import IndexForm from '@/app/components/IndexForm';

const Em = styled('em')({
	color: 'rgb(9,102,210)'
});

const Title = styled(Typography)({
	fontWeight: '700',
	fontFamily: 'Montserrat',
	textAlign: 'center',
	color: 'rgba(0,0,0,0.81)'
});

const SubTitle = styled(Typography)({
	fontFamily: 'Montserrat',
	fontWeight: '700',
	fontSize: '18px'
});

const SubText = styled(Typography)({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	textAlign: 'center',
	color: '#0000008c'
});

const BlurredCircle = styled(Box)({
	position: 'absolute',
	width: '10%',
	height: '1px',
	borderRadius: '50%',
	backgroundColor: 'rgb(79, 238, 255, 0.35)',
	boxShadow: '0 0 1500px 180px rgba(79, 238, 255, 0.35)',
	animation: 'colorChange 5s infinite alternate'
});

const ContentContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	margin: '70px 0',
	justifyContent: 'space-around'
});

const ContentCardMedia = styled(CardMedia)(({ theme }) => ({
	borderRadius: '45px',
	width: '95%',
	height: '210px',
	[theme.breakpoints.up('md')]: {
		width: '400px',
		height: '240px'
	},
	draggable: false,
	component: 'img'
}));

export default function Home() {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900);
	}, []);

	return (
		<Container maxWidth="lg" disableGutters>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
			     height="calc(100vh - 81px)">
				<BlurredCircle zIndex={ 1 }/>
				<Title zIndex={ 10 } fontSize={ { xs: '22px', md: '36px' } } width={ { xs: 'auto', md: 900 } }>
					Welcome to <Em sx={ { fontSize: { xs: 32, md: 52 } } }>NotLex</Em> - Your English Word Learning
					Hub!
				</Title>
				<SubText width={ { xs: 'auto', md: 900 } }
				         fontSize={ { xs: '1rem', md: '17px' } } zIndex={ 10 } marginTop={ 3 }>Are you tired of
					traditional language learning methods ? Say goodbye to mundane vocabulary drills and welcome to
					NotLex, where the world of English words comes to life!</SubText>
				<Box zIndex={ 10 } mt="12px">
					<Button sx={ { mx: 2 } } variant="contained">
						<Typography fontFamily="Montserrat">Connect</Typography>
					</Button>
					<Button sx={ { mx: 2 } } variant="outlined">
						<Typography fontFamily="Montserrat">Learn more</Typography>
					</Button>
				</Box>
			</Box>
			<Divider/>
			<ContentContainer flexDirection="column">
				<Box display="flex" justifyContent="space-between" width="100%"
				     flexDirection={ { xs: 'column-reverse', md: 'row' } }>
					<Box width={ { xs: '100%', md: '50%' } } display="flex" flexDirection="column"
					     alignItems="center" mt={ { xs: '45px', md: 0 } }>
						<SubTitle>Connect your account</SubTitle>
						<IndexForm/>
					</Box>
					<Box width={ { xs: '100%', md: '50%' } } display="flex" flexDirection="column"
					     alignItems="center">
						<SubTitle>
							Log in using your Notion account
						</SubTitle>
						<SubText mt="15px">
							Ready to continue your word-learning journey with NotLex? Simply log in using your
							Notion account. Create an integration, copy and paste your access token and database ID.
						</SubText>
						<SubText mt="15px">
							Need Help? Check out our <Link href="/">detailed guide</Link> on how to start using
							NotLex
						</SubText>
					</Box>
				</Box>
			</ContentContainer>
			<Divider/>
			<ContentContainer flexDirection="column">
				<Title fontSize="24px">
					What is <Em sx={ { fontSize: 30 } }>NotLex</Em> ?
				</Title>
				<SubText mt="15px" width={ { xs: 'auto', md: 900 } }>
					NotLex is an innovative online platform designed to revolutionize the way you learn English
					words. Leveraging the power of Notion, the popular note-taking app, we've created a seamless
					learning experience that puts you in control of your language journey.
				</SubText>
			</ContentContainer>
			<Divider/>
			<ContentContainer flexDirection={ { xs: 'column-reverse', md: 'row' } }>
				<ContentCardMedia
					image="https://images.unsplash.com/photo-1667372283587-e1557c08aca4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8RGF0YWJhc2V8fHx8fHwxNjkwODY4NTI1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"/>
				<Box width={ { xs: '100%', md: '50%' } } marginBottom={ { xs: '25px', md: 0 } }>
					<Title fontSize="24px">Your Personal Word Database</Title>
					<SubText mt="15px">
						With NotLex, you'll have your very own word database at your fingertips. Store words,
						meanings,
						examples, translations, and more in a structured and organized manner. Our intelligent API
						integration with Notion ensures that you can effortlessly sync and access your vocabulary,
						making learning on-the-go a breeze.
					</SubText>
				</Box>
			</ContentContainer>
			<Divider/>
			<ContentContainer flexDirection={ { xs: 'column-reverse', md: 'row-reverse' } }>
				<ContentCardMedia
					image="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8bGVhcm5pbmcgcHJvZ3JhbXx8fHx8fDE2OTA4NjkxMjM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"/>
				<Box width={ { xs: '100%', md: '50%' } } marginBottom={ { xs: '25px', md: 0 } }>
					<Title fontSize="24px">Engaging Learning Programs</Title>
					<SubText mt="15px">
						Learning should be fun, not a chore. NotLex offers a variety of interactive and engaging
						learning programs to suit your preferences. Choose from a range of activities such as
						selecting the correct translation, matching words with their meanings, and more. We're
						constantly innovating, so expect exciting new features on the horizon!
					</SubText>
				</Box></ContentContainer>
			<Divider/>
			<ContentContainer flexDirection={ { xs: 'column', md: 'row' } }>
				<Title fontSize="24px" width={ { xs: '100%', md: '50%' } }>Simplicity Meets
					Elegance</Title>
				<SubText mt="15px" width={ { xs: 'auto', md: '50%' } }>
					We believe in the power of minimalism, which is why NotLex boasts a sleek and elegant design.
					Enjoy a clutter-free interface that lets you focus on what matters most - expanding your English
					vocabulary.
				</SubText>
			</ContentContainer>
			<Divider/>
			<ContentContainer flexDirection={ { xs: 'column-reverse', md: 'row' } }>
				<ContentCardMedia
					image="https://images.unsplash.com/photo-1523939158338-1708c2391359?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8QW55dGltZSBBbnl3aGVyZXx8fHx8fDE2OTA4Njk1MDE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"/>
				<Box width={ { xs: '100%', md: '50%' } } marginBottom={ { xs: '25px', md: 0 } }>
					<Title fontSize="24px">Learn Anytime, Anywhere</Title>
					<SubText mt="15px">
						Whether you're on your desktop, laptop, or mobile device, NotLex adapts seamlessly to
						provide an optimal learning experience. Switch between light and dark themes to suit your
						preferences and protect your eyes during those late-night study sessions.
					</SubText>
				</Box></ContentContainer>
			<Divider/>
		</Container>
	);
}