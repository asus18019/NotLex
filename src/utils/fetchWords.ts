interface FetchWordsOptions {
	category?: string,
	randomize?: boolean,
	page?: number,
	pageSize?: number,
	search?: string
}

export async function fetchWords(accessToken: string, options?: FetchWordsOptions) {
	const randomizeQueryParam = options?.randomize ? 'true' : 'false';
	const categoryQueryParam = options?.category?.length ? `&category=${ options.category }` : '';
	const pageQueryParam = options?.page ? `&page=${ options.page }` : '';
	const pageSizeQueryParam = options?.pageSize ? `&pageSize=${ options.pageSize }` : '';
	const searchQueryParam = options?.search?.length ? `&search=${ options.search }` : '';

	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/words?randomize=${ randomizeQueryParam + categoryQueryParam + pageQueryParam + pageSizeQueryParam + searchQueryParam }`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	});
}