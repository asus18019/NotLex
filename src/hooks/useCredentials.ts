import { getCookie } from 'cookies-next';

interface CredentialsType {
	secret: string | undefined,
	database_id: string | undefined
}

export const useCredentials = () => {
	const credentials = getCookie('credentials');
	const { secret, database_id }: CredentialsType = JSON.parse(credentials?.toString() || '{}');
	return [ secret, database_id ];
}