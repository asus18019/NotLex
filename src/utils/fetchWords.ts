interface FetchWordsOptions {
	category?: string[],
	randomize?: boolean,
	page?: number,
	pageSize?: number,
	search?: string,
	sortBy?: 'word' | 'progress' | 'created_at',
	orderBy?: 'asc' | 'desc'
}

export async function fetchWords(accessToken: string, options?: FetchWordsOptions) {
	const randomizeQueryParam = options?.randomize ? 'true' : 'false';
	const categoryQueryParam = options?.category?.length ? `&category=${ JSON.stringify(options.category) }` : '';
	const pageQueryParam = options?.page ? `&page=${ options.page }` : '';
	const pageSizeQueryParam = options?.pageSize ? `&pageSize=${ options.pageSize }` : '';
	const searchQueryParam = options?.search?.length ? `&search=${ options.search }` : '';
	const sortByQueryParam = options?.sortBy ? `&sortBy=${ options.sortBy }` : '';
	const orderByQueryParam = options?.orderBy ? `&orderBy=${ options.orderBy }` : '';

	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/words?randomize=${ randomizeQueryParam + categoryQueryParam + pageQueryParam + pageSizeQueryParam + searchQueryParam + sortByQueryParam + orderByQueryParam }`, {
		headers: { 'Authorization': `Bearer ${ accessToken }` }
	});
}