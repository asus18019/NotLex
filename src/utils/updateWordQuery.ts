import { UpdateWordData } from '@/types';

export const updateWordQuery = async (updateData: UpdateWordData, accessToken: string) => {
	const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/update-word`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ accessToken }`
		},
		body: JSON.stringify(updateData)
	});

	if(response.status !== 200) {
		throw new Error('Something went wrong...');
	}
};