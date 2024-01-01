import { CategoryType } from '@/types';

export const fetchCategories = async (accessToken: string): Promise<{ properties: CategoryType[] }> => {
	const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/get-categories`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	});

	return await res.json();
};