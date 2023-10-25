import { Box } from '@mui/material';
import { ReactNode } from 'react';

const Span = ({ weight = 'inherit', size = 'inherit', style = '', children }: {
	weight?: string | number,
	size?: string,
	style?: string,
	children: ReactNode
}) => {
	return <Box component="span" fontSize={ size } fontStyle={ style } fontWeight={ weight }>{ children }</Box>;
};

export default Span;