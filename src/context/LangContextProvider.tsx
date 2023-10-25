'use client';
import { ReactNode, createContext } from 'react';
import { Locale } from '../../i18n.config';

const InitialLang: { lang: Locale } = { lang: 'en' };

export const LangContext = createContext<{ lang: Locale }>(InitialLang);

export default function LangContextProvider({ lang, children }: { lang: Locale, children: ReactNode }) {
	return (
		<LangContext.Provider value={ { lang } }>
			{ children }
		</LangContext.Provider>
	);
};