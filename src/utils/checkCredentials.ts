import { CredentialsType } from '@/types';

export const checkSecrets = async ({ secret, database_id }: CredentialsType): Promise<Response> => {
	return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/check-secrets`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ secret: secret, database_id })
	});
};