'use client'
import { Box, styled } from '@mui/material';

const CardContainer = styled(Box)(({ theme }) => ({
	width: 'calc(100vw - 64px)',
	backgroundColor: "lightcyan",
	padding: "15px",
	borderRadius: "10px",
	marginTop: '10px',
	[theme.breakpoints.up('md')]: {
		width: '700px'
	}
}));

const skeletonStyle = {
	animation: 'skeleton-loading 1s linear infinite alternate',
	'@keyframes skeleton-loading': {
		'0%': {
			opacity: 1
		},
		'100%': {
			opacity: 0.2
		},
	},
};

export default function SkeletonCard() {
	return (
		<CardContainer>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box sx={ skeletonStyle } m="5px 0 3px 0" width="110px" height="17px" bgcolor="#CAE7E7" borderRadius="12px"/>
				<Box sx={ skeletonStyle } width="40px" height="25px" bgcolor="#7DC4C4" borderRadius="12px"/>
			</Box>

			<Box sx={ skeletonStyle } m="12px 0 6px 0" width="80%" height="14px" bgcolor="#d9d9d9" borderRadius="12px"/>
			<Box sx={ skeletonStyle } m="12px 0 6px 0" width="100%" height="14px" bgcolor="#f2f2f2" borderRadius="12px"/>
			<Box mt="5px" display="flex" flexWrap="wrap" gap="5px">
				<Box sx={ skeletonStyle } mt="5px" width="60px" height="27px" bgcolor="#EBD535" borderRadius="12px"/>
			</Box>

		</CardContainer>
	);
};