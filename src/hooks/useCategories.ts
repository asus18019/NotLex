import md5 from 'md5';
import { fetchCategories } from '@/utils/fetchCategories';
import { getCookie, setCookie } from 'cookies-next';
import { CategoryType } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';

export const useCategories = () => {
	const [secret, database_id] = useCredentials();
	const categories: CategoryType[] = JSON.parse(getCookie('categories')?.toString() || '[]');

	const syncCategories = async (notionCategoriesHash: string) => {
		const isLocalCategoriesHashEqualsNotion = md5(JSON.stringify(categories)) === notionCategoriesHash;
		if(!isLocalCategoriesHashEqualsNotion) {
			const { properties: fetchedCategories } = await fetchCategories({ secret: secret, database_id: database_id } );
			setCookie('categories', JSON.stringify(fetchedCategories));
		}
	};

	return { categories, syncCategories };
};