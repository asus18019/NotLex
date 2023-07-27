import Nav from '@/components/Nav';
import { Box, Button, Container, styled, Typography, FormControl, Divider } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress';

const Em = styled('em')({
	color: 'rgb(9,102,210)'
});

const Title = styled(Typography)({
	fontWeight: '700',
	fontFamily: 'Montserrat',
	textAlign: 'center',
	color: 'rgba(0,0,0,0.81)'
});

const SubText = styled(Typography)({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	textAlign: 'center'
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

const FormInput = styled('input')({
	fontWeight: '500',
	fontFamily: 'Montserrat',
	fontSize: '14px',
	outline: 'none',
	padding: '8px 16px',
	borderRadius: '6px',
	// width: '320px',
	color: 'rgba(0,0,0,0.55)',
	border: '1px solid gray',
	':nth-child(2n)': {
		marginTop: '10px'
	}
});

export default function Home() {
	const [secret, setSecret] = useState('');
	const [dbId, setDbId] = useState('');

	const [showMenu, setShowMenu] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		setShowMenu(window.screen.width > 900)
	}, [])

	const handleLogin = async (e: any) => {
		e.preventDefault();

		setIsFetching(true);
		try {
			const res = await fetch('https://notlex-api.vercel.app/check-secrets', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ secret: secret, database_id: dbId })
			});

			if(res.ok) {
				const credentials = { secret, database_id: dbId };
				Cookies.set('credentials', JSON.stringify(credentials));
				setSecret('');
				setDbId('');
			} else {
				console.log("something went wrong");
			}
		} catch(e) {
			console.log(e);
		} finally {
			setIsFetching(false);
		}
	}

	return (
		<Container maxWidth="lg" sx={{ px: { xs: 0, md: 'auto' } }}>
			<Nav showMenu={ showMenu } setShowMenu={ () => setShowMenu(!showMenu) }/>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
			     height="calc(100vh - 81px)">
				<BlurredCircle zIndex={ 1 }/>
				<Title zIndex={ 10 } fontSize={{ xs: '22px', md: '36px' }} width={{ xs: 'auto', md: 900 }}>
					Welcome to <Em sx={{ fontSize: { xs: 32, md: 52 } }}>NotLex</Em> - Your English Word Learning Hub!
				</Title>
				<SubText color="rgba(0,0,0,0.55)" width={{ xs: 'auto', md: 900 }} fontSize={{ xs: '1rem', md: '17px' }} zIndex={ 10 } marginTop={ 3 }>Are you tired of
					traditional language learning
					methods ? Say
					goodbye to mundane vocabulary drills and welcome to NotLex, where the world of English words comes
					to life!</SubText>
				<Box marginTop={ 3 } zIndex={ 10 }>
					<Button sx={ { mx: 2 } } variant="contained">
						<Typography fontFamily="Montserrat">Connect</Typography>
					</Button>
					<Button sx={ { mx: 2 } } variant="outlined">
						<Typography fontFamily="Montserrat">Learn more</Typography>
					</Button>
				</Box>
			</Box>
			<Divider/>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Box display="flex" justifyContent="space-between" width="100%" margin="70px 0" flexDirection={{ xs: "column-reverse", md: "row" }}>
					<Box width={{ xs: "100%", md: "50%" }} display="flex" flexDirection="column" alignItems="center" marginTop={{ xs: '45px', md: 0 }}>
						<Typography
							fontFamily="Montserrat"
							fontWeight="700"
							fontSize="18px"
						>Connect your account</Typography>
						<form onSubmit={ handleLogin }>
							<FormControl sx={ { my: '25px' } } fullWidth>
								<FormInput placeholder="SECRET KEY" type="text" required value={ secret } onChange={ e => setSecret(e.target.value) }/>
								<FormInput placeholder="DATABASE ID" type="text" required value={ dbId } onChange={ e => setDbId(e.target.value) }/>
							</FormControl>
							<Button variant="contained" type="submit" fullWidth disabled={ isFetching }>
								{ isFetching ? (
									<CircularProgress size={ 24 }/>
								) : (
									<Typography fontFamily="Montserrat">Submit</Typography>
								) }
							</Button>
						</form>
					</Box>
					<Box width={{ xs: "100%", md: "50%" }} display="flex" flexDirection="column" alignItems="center">
						<Typography
							fontFamily="Montserrat"
							fontWeight="700"
							fontSize="18px"
						>
							Log in using your Notion account
						</Typography>
						<SubText color="rgba(0,0,0,0.55)" marginTop="15px" width="100%">
							Ready to continue your word-learning journey with NotLex? Simply log in using your
							Notion account. Create an integration, copy an paste your access token and database ID.
						</SubText>
						<SubText color="rgba(0,0,0,0.55)" marginTop="15px" width="100%">
							Need Help? Check out our <Link href="/">detailed guide</Link> on how to start using NotLex
						</SubText>
					</Box>
				</Box>
			</Box>
			<Divider/>
			<Box display='flex' justifyContent='center' alignItems='center' margin='70px 0'>
				<Title zIndex={ 10 } fontSize="24px">
					What is <Em sx={{ fontSize: 30 }}>NotLex</Em> ?
				</Title>
			</Box>
		</Container>
	);
}
