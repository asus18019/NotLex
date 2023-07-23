import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {

	interface Palette {
		primaryLight: Palette['primary'];
	}

	interface PaletteOptions {
		primaryLight: PaletteOptions['primary'];
	}
}

export const theme = createTheme({
	palette: {
		primaryLight: {
			main: "#000000"
		}
	},
	typography: {
	}
});