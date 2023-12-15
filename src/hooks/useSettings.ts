import { SettingsCookie } from '@/types';
import { getCookie, setCookie } from 'cookies-next';
import { CREDENTIALS_COOKIES_MAX_AGE } from '@/config/cookies';

/*
	This object is for users that are logged in system but don't have "settings" cookie to prevent application crush.
	It's needed for them to log in again to add "settings" cookie
*/

const defaultSettings = `
	{  
		"crosswordWordCount": 10
	}
`;

export const useSettings = () => {
	const settings = JSON.parse(getCookie('settings')?.toString() || defaultSettings) as SettingsCookie;

	const wordsPerCrossword = settings.crosswordWordCount;

	const setWordsPerCrossword = (numberOfWords: number) => {
		const updatedSettings: SettingsCookie = {
			...settings,
			crosswordWordCount: numberOfWords
		};

		setCookie('settings', JSON.stringify(updatedSettings), { maxAge: CREDENTIALS_COOKIES_MAX_AGE });
	};

	return {
		wordsPerCrossword,
		setWordsPerCrossword
	};
};