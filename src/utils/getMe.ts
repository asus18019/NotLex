export const getMe = async (accessToken: string): Promise<Response> => {
	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/me`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	})
};