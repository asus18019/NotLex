import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { checkSecrets } from '@/utils/checkCredentials';
import { matchRoute, runNextMiddleware } from '@/middleware';

const privateRoutes = ['/dashboard', '/add', '/settings'];

export function withMiddleware1(middleware?: NextMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		if(!matchRoute(req.url, privateRoutes)) {
			return runNextMiddleware(req, event, middleware);
		}

		const credentials = req.cookies.get('credentials');
		const { secret, database_id } = JSON.parse(credentials?.value || '{}');

		if(!secret || !database_id) {
			return NextResponse.redirect(new URL('/', req.url));
		}

		try {
			const res = await checkSecrets({ secret, database_id });
			if(!res.ok) {
				new Error('This route is unavailable');
			}
		} catch(error) {
			console.log(error);
			return NextResponse.redirect(new URL('/', req.url));
		}
		return runNextMiddleware(req, event, middleware);
	};
}