import { Locale } from '../../i18n.config';

const dictionaries = {
	en: () => require('../../dictionaries/en.json'),
	de: () => require('../../dictionaries/de.json')
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();