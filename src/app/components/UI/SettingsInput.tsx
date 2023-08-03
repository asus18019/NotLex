import { IconButton, InputAdornment, InputBase } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface SettingsInputProps {
	value: string,
	showPassword: boolean,
	handleClickShowPassword: () => void,
	handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const SettingsInput = ({
	value,
	showPassword,
	handleClickShowPassword,
	handleMouseDownPassword
}: SettingsInputProps) => {
	return (
		<InputBase
			readOnly={ true }
			type={ showPassword ? 'text' : 'password' }
			value={ value }
			sx={ {
				width: { xs: 'auto', md: '40%' },
				ml: { xs: '20px', md: 0 },
				fontSize: '14px',
				pr: '7px',
				bgcolor: '#ededed',
				padding: '2px 12px',
				borderRadius: '6px',
			} }
			endAdornment={
				<InputAdornment position="end" sx={ { p: 0 } }>
					<IconButton
						onClick={ handleClickShowPassword }
						onMouseDown={ handleMouseDownPassword }
						edge="end"
					>
						{ showPassword ? <VisibilityOff/> : <Visibility/> }
					</IconButton>
				</InputAdornment>
			}
		/>
	);
};