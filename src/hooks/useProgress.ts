import { useCredentials } from '@/hooks/useCredentials';

export const useProgress = () => {
	const { accessToken } = useCredentials();

	const updateProgress = async (wordId: number, difference: number) => {
		await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/update-word`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ accessToken }`
			},
			body: JSON.stringify({ wordId, progress: difference })
		});
	};

	return {
		updateProgress
	};
};