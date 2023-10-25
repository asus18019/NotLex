import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { chain } from '@/middlewares/chain';
import { withMiddleware1 } from '@/middlewares/privateRoutes';

export default chain([withMiddleware1]);

export const runNextMiddleware = (req: NextRequest, event: NextFetchEvent, middleware?: NextMiddleware) => {
	return middleware && middleware(req, event);
};

export const matchRoute = (currentRoute: string, routes: string[]): boolean => {
	let isMatchRoute = false;
	routes.forEach(route => {
		if(currentRoute.includes(route)) {
			isMatchRoute = true;
		}
	});
	return isMatchRoute;
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};