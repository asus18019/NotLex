import { useCredentials } from '@/hooks/useCredentials';

export const useProgress = () => {
	const [secret] = useCredentials();

	const updateProgress = async (page_id: string, difference: number) => {
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