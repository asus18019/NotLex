import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { getMe } from '@/utils/getMe';
import { matchRoute, runNextMiddleware } from '@/middleware';
import { i18n } from '../../i18n.config';

const privateRoutes = ['/dashboard', '/settings', '/library'];

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

		const credentials = req.cookies.get('tokens');
		const { accessToken } = JSON.parse(credentials?.value || '{}');

		if(!accessToken) {
			return NextResponse.redirect(new URL(redirectUrl, req.url));
		}

		try {
			const res = await getMe(accessToken);
			if(!res.ok) {
				return NextResponse.redirect(new URL(redirectUrl, req.url));
			}
		} catch(error) {
			console.log(error);
			return NextResponse.redirect(new URL(redirectUrl, req.url));
		}
		return runNextMiddleware(req, event, middleware);
	};
}