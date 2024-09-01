import 'server-only';

import type { NextRequest } from 'next/server';

import { NextResponse, URLPattern } from 'next/server';

export const matchUrlPattern = (url: string) => {
  const urlPatterns = getUrlPatterns();
  const input = url.split('?')[0];

  for (const urlPattern of urlPatterns) {
    const patternResult = urlPattern.pattern.exec(input);

    if (patternResult !== null && 'pathname' in patternResult) {
      return urlPattern.handler;
    }
  }
};

function getUrlPatterns() {
  return [
    // {
    //   pattern: new URLPattern({ pathname: '/miscellaneous' }),
    //   handler: async (req: NextRequest, res: NextResponse) => {
    //     const origin = req.nextUrl.origin;
    //     return NextResponse.redirect(
    //       new URL('/miscellaneous/index', origin).href
    //     );
    //   }
    // },
    // {
    //   pattern: new URLPattern({ pathname: '/searching' }),
    //   handler: async (req: NextRequest, res: NextResponse) => {
    //     const origin = req.nextUrl.origin;
    //     return NextResponse.redirect(
    //       new URL('/searching/linear-search', origin).href
    //     );
    //   }
    // },
    {
      pattern: new URLPattern({ pathname: '/security' }),
      handler: async (req: NextRequest, res: NextResponse) => {
        const origin = req.nextUrl.origin;
        return NextResponse.redirect(
          new URL('/security/ceasar-cipher', origin).href
        );
      },
    },
    // {
    //   pattern: new URLPattern({ pathname: '/sorting' }),
    //   handler: async (req: NextRequest, res: NextResponse) => {
    //     const origin = req.nextUrl.origin;
    //     return NextResponse.redirect(
    //       new URL('/sorting/bubble-sort', origin).href
    //     );
    //   }
    // },
  ];
}
