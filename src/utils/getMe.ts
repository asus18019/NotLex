import { useCredentials } from '@/hooks/useCredentials';

export const getMe = async (token?: string): Promise<Response> => {
	const { accessToken } = useCredentials();
	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/me`, {
		headers: { 'Authorization': `Bearer ${ token || accessToken }` }
	})
};