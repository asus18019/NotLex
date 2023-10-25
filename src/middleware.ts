import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { checkSecrets } from '@/utils/checkCredentials';

const privateRoutes = ['/dashboard', '/add', '/settings'];

export default withMiddleware1();

const runNextMiddleware = (req: NextRequest, event: NextFetchEvent, middleware?: NextMiddleware) => {
	return middleware && middleware(req, event);
};

const matchRoute = (currentRoute: string, routes: string[]): boolean => {
	let isMatchRoute = false;
	routes.forEach(route => {
		if(currentRoute.includes(route)) {
			isMatchRoute = true;
		}
	});
	return isMatchRoute;
};

function withMiddleware1(middleware?: NextMiddleware) {
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

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};