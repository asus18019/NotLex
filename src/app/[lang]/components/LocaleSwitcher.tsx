'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { i18n, languages } from '../../../../i18n.config';
import { Box, Typography, Menu, MenuItem, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { LangContext } from '@/context/LangContextProvider';

const LanguageContainer = styled(Box)({
	margin: 'auto',
	cursor: 'pointer',
	display: 'flex',
	padding: '8px',
	borderRadius: '5px',
	':hover': {
		backgroundColor: '#d9e7ff'
	}
});

export default function LocaleSwitcher() {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const { lang } = useContext(LangContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: any) => {
		if(anchorEl) {
			return setAnchorEl(null);
		}
		setAnchorEl(event.currentTarget);
	};

	const redirectedPathName = (locale: string) => {
		const queryParameters = Object.fromEntries(searchParams);
		let queryUrl = ''
		for(const query in queryParameters) {
			const sign = queryUrl ? '&' : '?';
			queryUrl += `${ sign + query }=${ queryParameters[query] }`;
		}
		if(!pathName) return '/';
		const segments = pathName.split('/');
		segments[1] = locale;
		return segments.join('/') + queryUrl;
	};

	return (
		<>
			<LanguageContainer onClick={ handleClick } sx={ { backgroundColor: anchorEl ? '#d9e7ff' : 'transparent' } }>
				<Image src="./../language-icon.svg" alt="" width="20" height="20"/>
				<Typography marginLeft="8px" fontWeight="bold">{ languages[lang] }</Typography>
			</LanguageContainer>
			<Menu
				anchorEl={ anchorEl }
				open={ Boolean(anchorEl) }
				onClose={ handleClick }
			>
				{ i18n.locales.map(locale => (
					<MenuItem
						key={ locale }
						component={ Link }
						href={ redirectedPathName(locale) }
						onClick={ handleClick }
						sx={ {
							color: 'inherit',
							textDecoration: 'inherit',
							fontWeight: locale === lang ? 'bold' : 'inherit'
						} }
					>
						{ languages[locale] }
					</MenuItem>
				)) }
			</Menu>
		</>
	);
}