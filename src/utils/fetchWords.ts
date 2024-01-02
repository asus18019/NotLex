interface FetchWordsOptions {
	category?: string,
	randomize?: boolean
}

export async function fetchWords(accessToken: string, options?: FetchWordsOptions) {
	console.log(options);
	const randomizeQueryParam = options?.randomize ? 'true' : 'false';
	const categoryQueryParam = options?.category?.length ? `&category=${ options.category }` : '';
	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/words?randomize=${ randomizeQueryParam }${ categoryQueryParam }`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	});
}