import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { runNextMiddleware } from '@/middleware';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { i18n } from '../../i18n.config';

const allowedImageExtension = ['.svg', '.png'];

export function withMiddleware2(middleware?: NextMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		const pathname = req.nextUrl.pathname;

		for(const extension of allowedImageExtension) {
			if(pathname.endsWith(extension)) {
				return runNextMiddleware(req, event, middleware);
			}
		}

		const pathnameIsMissingLocale = i18n.locales.every(
			locale => !pathname.startsWith(`/${ locale }/`) && pathname !== `/${ locale }`
		);

		if(pathnameIsMissingLocale) {
			const locale = getLocale(req);
			return NextResponse.redirect(
				new URL(`/${ locale }${ pathname.startsWith('/') ? '' : '/' }${ pathname }`, req.url)
			);
		}

		return runNextMiddleware(req, event, middleware);
	};
}

function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	return matchLocale(languages, locales, i18n.defaultLocale);
}
