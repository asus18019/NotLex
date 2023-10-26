export const i18n = {
	defaultLocale: 'en',
	locales: ['en', 'de']
} as const;

export type Locale = (typeof i18n)['locales'][number];
export const languages: { [key in Locale]: string } = {
	en: 'English',
	de: 'Deutsch'
};