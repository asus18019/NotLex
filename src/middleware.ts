import { NextRequest, NextResponse } from 'next/server';
import { checkSecrets } from '@/utils/checkCredentials';

export async function middleware(req: NextRequest) {
	const credentials = req.cookies.get('credentials');
	const { secret, database_id } = JSON.parse(credentials?.value || '{}');

	if(!secret || !database_id) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	try {
		const res = await checkSecrets({ secret, database_id });
		if(!res.ok) {
			new Error('This route is unavailable');
		}
	} catch(error) {
		console.log(error);
		return NextResponse.redirect(new URL('/', req.url))
	}
}


export const config = {
	matcher: ['/dashboard', '/add', '/settings']
}