'use client';
import { CardProps } from '@/types';
import { Box, CardContent, CardMedia, Typography, Card, styled } from '@mui/material';
import Swappable from '@/app/dashboard/components/Swappable';

const StyledCard = styled(Card)(({ theme }) => ({
	margin: '0 auto',
	p: 0,
	boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
	borderRadius: '14px',
	width: '90%',
	height: 'auto',
	[theme.breakpoints.up('md')]: {
		width: '450px'
	}
}));

const WordCard = ({ data, active, removeCard }: CardProps) => {
	return active && (
		<Swappable { ...{ removeCard, data } }>
			<StyledCard>
				<CardMedia
					draggable={ false }
					component="img"
					width="500px"
					image={ `https://source.unsplash.com/500x300/?${ data.meaning }` }
				/>
				<CardContent>
					<Typography fontSize={ 20 } textAlign="center" fontFamily="Montserrat"
					            fontWeight={ 700 } padding={ { xs: 0, md: '10px 0' } }>
						{ data.word }
					</Typography>
					<Box padding="10px 0" color="rgba(0,0,0,0.81)">
						<Typography fontSize={ 15 } fontFamily="Montserrat" fontWeight={ 500 }>
							{ data.meaning }
						</Typography>
					</Box>
					<Typography fontSize={ 15 } fontFamily="Montserrat" fontWeight={ 500 }>
						{ data.sentence }
					</Typography>
				</CardContent>
			</StyledCard>
		</Swappable>
	);
};

export default WordCard;