import { CredentialsType } from '@/types';

export const checkSecrets = async ({ secret, database_id }: CredentialsType): Promise<boolean> => {
	const res = await fetch('https://notlex-api.vercel.app/check-secrets', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ secret: secret, database_id })
	});

	return res.ok;
};