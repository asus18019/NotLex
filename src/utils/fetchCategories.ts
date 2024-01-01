import { CategoryType } from '@/types';
import { useCredentials } from '@/hooks/useCredentials';

export const fetchCategories = async (): Promise<{ properties: CategoryType[] }> => {
	const { accessToken } = useCredentials();

	const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/get-categories`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	});

	return await res.json();
};