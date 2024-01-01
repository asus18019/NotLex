'use client';
import { ServerComponentPropsType } from '@/types';
import { setCookie } from 'cookies-next';
import { CREDENTIALS_COOKIES_MAX_AGE } from '@/config/cookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const verifyEmail = async (token: string) => {
	return await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/verify-email`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ emailToken: token })
	});
};

export default function Add({ searchParams }: ServerComponentPropsType) {
	const router = useRouter();
	const { token } = searchParams;
	const [message, setMessage] = useState('');

	useEffect(() => {
		(async () => {
			const response = await verifyEmail(typeof token === 'string' ? token : '');
			if(response.ok) {
				const { accessToken } = await response.json();
				setCookie('tokens', JSON.stringify({ accessToken }), { maxAge: CREDENTIALS_COOKIES_MAX_AGE });
				router.push('/');
			} else {
				setMessage('Invalid token');
			}
		})();
	}, []);

	return (
		<div>{ message }</div>
	);
};