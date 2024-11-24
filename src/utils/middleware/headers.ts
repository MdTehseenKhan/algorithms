import 'server-only';

import type { NextRequest } from 'next/server';

import { headers } from 'next/headers';

export function getRequestHeaders(request: NextRequest) {
  const correlationId =
    request.headers.get('x-correlation-id') || crypto.randomUUID();

  const headers = new Headers(request.headers);
  // headers.set('x-pathname', request.nextUrl.pathname);
  headers.set('x-request-id', crypto.randomUUID());
  headers.set('x-correlation-id', correlationId);
  return headers;
}

export enum RequestHeader {
  CORRELATION_ID = 'x-correlation-id',
  REQUEST_ID = 'x-request-id',
  // PATHNAME = 'x-pathname',
}

export function getHeader(header: RequestHeader) {
  const headerList = headers();
  return String(headerList.get(header));
}
