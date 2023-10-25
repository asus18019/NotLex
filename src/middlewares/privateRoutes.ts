import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { checkSecrets } from '@/utils/checkCredentials';
import { matchRoute, runNextMiddleware } from '@/middleware';
import { i18n } from '../../i18n.config';

const privateRoutes = ['/dashboard', '/add', '/settings'];

export function withMiddleware1(middleware?: NextMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		if(!matchRoute(req.url, privateRoutes)) {
			return runNextMiddleware(req, event, middleware);
		}

		const pathname = req.nextUrl.pathname
		const pathnameIsMissingLocale = i18n.locales.every(
			locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
		)

		let locale = '';
		if(!pathnameIsMissingLocale) {
			locale = pathname.split('/')[1];
		}
		const redirectUrl = `/${ locale }`;

		const credentials = req.cookies.get('credentials');
		const { secret, database_id } = JSON.parse(credentials?.value || '{}');

		if(!secret || !database_id) {
			return NextResponse.redirect(new URL(redirectUrl, req.url));
		}

		try {
			const res = await checkSecrets({ secret, database_id });
			if(!res.ok) {
				new Error('This route is unavailable');
			}
		} catch(error) {
			console.log(error);
			return NextResponse.redirect(new URL(redirectUrl, req.url));
		}
		return runNextMiddleware(req, event, middleware);
	};
}