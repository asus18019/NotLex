import md5 from 'md5';
import { fetchCategories } from '@/utils/fetchCategories';
import { getCookie, setCookie } from 'cookies-next';
import { CategoryType, CredentialsType } from '@/types';

export const useCategories = () => {
	const categories: CategoryType[] = JSON.parse(getCookie('categories')?.toString() || '[]');

	const syncCategories = async (notionCategoriesHash: string, credentials: CredentialsType) => {
		const isLocalCategoriesHashEqualsNotion = md5(JSON.stringify(categories)) === notionCategoriesHash;
		if(!isLocalCategoriesHashEqualsNotion) {
			const { properties: fetchedCategories } = await fetchCategories(credentials);
			setCookie('categories', JSON.stringify(fetchedCategories));
		}
	};

	return { categories, syncCategories };
};