import { Box, Typography } from '@mui/material';

interface BadgeProps {
	text: string,
	color: string,
	fontSize: string,
	deleteIcon?: JSX.Element
}

export default function Badge({ text, color, fontSize, deleteIcon }: BadgeProps) {
	return (
		<Box width="fit-content" height="fit-content" padding="4px 6px" bgcolor={ color } borderRadius="12px" position="relative">
			{ deleteIcon }
			<Typography fontFamily="Montserrat" fontSize={ fontSize } color="white" fontWeight="600">{ text }</Typography>
		</Box>
	);
};