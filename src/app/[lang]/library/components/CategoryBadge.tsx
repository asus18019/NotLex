import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CategoryBadgeProps {
	isSelected: boolean,
	onClickBadge: () => void,
	children: ReactNode
}

const CategoryBadge = ({ isSelected, onClickBadge, children }: CategoryBadgeProps) => {
	return (
		<Box
			fontFamily="Montserrat"
			fontSize="15px"
			m="8px"
			p="6px 10px 6px 18px"
			position="relative"
			borderRadius="20px"
			border={ `1px solid ${ isSelected ? '#2886DE' : 'lightgray' }` }
			bgcolor={ isSelected ? '#E6F1FB' : '#F4F5F4' }
			sx={ { cursor: 'pointer' } }
			onClick={ () => onClickBadge() }
		>
			{ children }
		</Box>
	);
};

export default CategoryBadge;