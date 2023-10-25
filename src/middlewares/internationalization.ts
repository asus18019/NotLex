import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { runNextMiddleware } from '@/middleware';

export function withMiddleware2(middleware?: NextMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		return runNextMiddleware(req, event, middleware);
	};
}