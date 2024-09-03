import { decodedToken } from './utils/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from 'jwt-decode';

const ADMIN_ROLE = '650d5e137ece568cd2f11a0a';
const admin_routes = ['/admin', '/admin/'];
const auth_routes = ['/perfil', '/perfil/'];

interface CustomJwtPayload extends JwtPayload {
  roles?: string[];
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  console.log(`Request for ${pathname}`);

  if (!isBasicAuthenticationRequiredRoute(pathname)) {
    console.log('No authentication required for this route.');
    return NextResponse.next();
  }

  let cookie = request.cookies.get(process.env.TOKEN_NAME || 'vagasprajr_token');
  let token: CustomJwtPayload | null = cookie?.value ? decodedToken(cookie?.value) : null;

  if (!token) {
    console.log('No token found, redirecting to login.');
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (!token?.exp || token.exp < Date.now() / 1000) {
    console.log('Token expired, redirecting to login.');
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (!isAdminRoute(pathname)) {
    console.log('No admin authorization required for this route.');
    return NextResponse.next();
  }

  if (token?.roles?.includes(ADMIN_ROLE)) {
    console.log('Token is valid for admin users, proceeding with request.');
    return NextResponse.next();
  }

  console.log('Token is invalid for admin users, redirecting to login.');
  url.pathname = '/auth/login';
  return NextResponse.redirect(url);
}

function isAdminRoute(pathname: string): boolean {
  return admin_routes.some((route) => pathname.startsWith(route));
}

function isBasicAuthenticationRequiredRoute(pathname: string): boolean {
  return admin_routes.some((route) => pathname.startsWith(route)) || auth_routes.some((route) => pathname.startsWith(route));
}
