import { NativeSelect } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

interface SelectProps {
	value: string,
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
	children: ReactNode
}

export default function Select({ value, onChange, children }: SelectProps) {
	return (
		<NativeSelect
			size="small"
			value={ value }
			variant="standard"
			sx={ {
				border: '1px solid gray',
				padding: '2px 12px',
				borderRadius: '10px',
				fontFamily: 'Montserrat',
				height: '38px',
				marginLeft: '10px',
				':before': { content: 'none' },
				':after': { content: 'none' }
			} }
			onChange={ onChange }
			inputProps={ {
				sx: { ':focus': { backgroundColor: 'transparent', borderBottom: 'none' } }
			} }
		>
			{ children }
		</NativeSelect>
	);
};