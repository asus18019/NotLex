import { InputBase } from '@mui/material';
import { SetStateAction } from 'react';

interface TransparentInputProps {
	value: string,
	onChange: (value: SetStateAction<string>) => void,
	styles?: Record<string, string | number>
}

const TransparentInput = ({ value, onChange, styles }: TransparentInputProps) => {
	return (
		<InputBase
			fullWidth
			multiline
			value={ value }
			onChange={ e => onChange(e.target.value) }
			sx={ {
				padding: 0,
				fontFamily: 'Montserrat',
				fontSize: '14px',
				lineHeight: 1.5,
				...styles
			} }
		/>
	);
};

export default TransparentInput;