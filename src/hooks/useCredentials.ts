import { getCookie } from 'cookies-next';
import { CredentialsType } from '@/types';

export const useCredentials = () => {
	const credentials = getCookie('tokens');
	const { accessToken }: CredentialsType = JSON.parse(credentials?.toString() || '{}');
	return { accessToken };
}