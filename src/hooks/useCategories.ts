import md5 from 'md5';
import { fetchCategories } from '@/utils/fetchCategories';
import { getCookie, setCookie } from 'cookies-next';
import { CategoryType } from '@/types';
import { CATEGORIES_COOKIES_MAX_AGE } from '@/config/cookies';
import { useCredentials } from '@/hooks/useCredentials';

export const useCategories = () => {
	const categories: CategoryType[] = JSON.parse(getCookie('categories')?.toString() || '[]');
	const { accessToken = '' } = useCredentials()

	const syncCategories = async (serverCategoriesHash: string) => {
		const isLocalCategoriesHashEqualsNotion = md5(JSON.stringify(categories)) === serverCategoriesHash;
		if(!isLocalCategoriesHashEqualsNotion) {
			const { properties: fetchedCategories } = await fetchCategories(accessToken);
			setCookie('categories', JSON.stringify(fetchedCategories), { maxAge: CATEGORIES_COOKIES_MAX_AGE });
		}
	};

	return { categories, syncCategories };
};