export const useProgress = () => {
	const updateProgress = async (secret: string, page_id: string, difference: number) => {
		await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/change-progress`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret, page_id, difference })
		});
	};

	return {
		updateProgress
	};
};