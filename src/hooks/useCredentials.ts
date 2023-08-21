import { getCookie } from 'cookies-next';
import { CredentialsType } from '@/types';

export const useCredentials = () => {
	const credentials = getCookie('credentials');
	const { secret, database_id }: CredentialsType = JSON.parse(credentials?.toString() || '{}');
	return [ secret, database_id ];
}