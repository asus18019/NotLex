import { CardProps } from '@/types';
import {
	motion,
	PanInfo,
	useMotionValue,
	useTransform
} from 'framer-motion';
import { useState } from 'react';
import { Box, CardContent, CardMedia, Typography, Card } from '@mui/material';

const WordCard = ({ data, active, removeCard }: CardProps) => {
	const [exitX, setExitX] = useState(100);

	const x = useMotionValue(1);
	const rotate = useTransform(x, [-500, 500], [-25, 25]);
	const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

	const dragEnd = (
		e: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if(info.offset.x > 100) {
			setExitX(200);
			removeCard(data.id, 'right');
		} else if(info.offset.x < -100) {
			setExitX(-200);
			removeCard(data.id, 'left');
		}
	};

	return (
		<>
			{ active ? (
				<motion.div
					drag="x"
					dragConstraints={ { left: 0, right: 0, top: 0, bottom: 0 } }
					onDragEnd={ dragEnd }
					initial={ { scale: 1, opacity: 1 } }
					animate={ { scale: 1, opacity: 1 } }
					style={ { x, rotate, opacity } }
					transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
					whileDrag={ { cursor: 'grabbing' } }
					exit={ { x: exitX } }
				>
					<Card sx={ {
						margin: '0 auto',
						p: 0,
						boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
						borderRadius: '14px',
						width: { xs: '90%', md: '450px' },
						height: { xs: '90%', md: '450px' }
					} }>
						<CardMedia
							draggable={ false }
							component="img"
							width="500px"
							image={ `https://source.unsplash.com/500x300/?${ data.meaning }` }
							alt="Paella dish"
						/>
						<CardContent>
							<Typography fontSize={ 20 } textAlign="center" fontFamily="Montserrat"
							            fontWeight={ 700 } padding={{ xs: 0, md: "10px 0" }}>
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
					</Card>
				</motion.div>
			) : null }
		</>
	);
};

export default WordCard;