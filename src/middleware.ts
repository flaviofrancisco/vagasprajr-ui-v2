import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodedToken } from './utils/jwt';
import { axiosPrivate } from './services/axios';

const ADMIN_ROLE = '650d5e137ece568cd2f11a0a';
const admin_routes = ['/admin'];
const auth_routes = ['/perfil'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (!isBasicAuthenticationRequiredRoute(pathname)) {
    return NextResponse.next();
  }

  let cookie = request.cookies.get(process.env.TOKEN_NAME || 'token');
  let token = cookie?.value ? decodedToken(cookie?.value) : null;

  if (!token) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url, {
      status: 302,
      headers: {
        Location: url.pathname,
      },
    });
  }

  if (!token?.exp || token.exp < Date.now() / 1000) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url, {
      status: 302,
      headers: {
        Location: url.pathname,
      },
    });
  }

  if (!isAdminRoute(pathname)) {
    return NextResponse.next();
  }

  let result = await axiosPrivate.post(
    '/auth/authorize',
    { roles: [ADMIN_ROLE] },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );

  if (!result?.data?.isAuthorized) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url, {
      status: 302,
      headers: {
        Location: url.pathname,
      },
    });
  }

  return NextResponse.next();
}

function isAdminRoute(pathname: string): boolean {
  return admin_routes.some((route) => pathname.startsWith(route));
}

function isBasicAuthenticationRequiredRoute(pathname: string): boolean {
  const merged_routes = auth_routes.concat(admin_routes);
  return merged_routes.some((route) => pathname.startsWith(route));
}
