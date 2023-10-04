import { CategoryType, CredentialsType } from '@/types';

export const fetchCategories = async ({ secret, database_id }: CredentialsType): Promise<{ properties: CategoryType[] }> => {
	const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/get-categories`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ secret: secret, database_id })
	});

	return await res.json();
};