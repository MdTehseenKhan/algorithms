import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { getRequestHeaders } from '@/utils/middleware/headers';
import { matchUrlPattern } from '@/utils/middleware/patterns';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const headers = getRequestHeaders(request);
  const response = NextResponse.next({
    request: { headers },
  });

  const handlePattern = matchUrlPattern(request.url);
  if (handlePattern) {
    const patternHandlerResponse = await handlePattern(request, response);
    if (patternHandlerResponse) {
      return patternHandlerResponse;
    }
  }

  return response;
}
