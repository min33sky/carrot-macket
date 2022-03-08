import { COOKIE_NAME } from 'constants/constants';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie_keys = Object.keys(req.cookies);

  console.log('[middleware] cookies: ', cookie_keys);
  // return NextResponse.next();

  // console.log('유알엘: ', req.nextUrl.pathname, req.nextUrl.pathname === '/auth');

  if (req.nextUrl.pathname === '/api/users/auth' || req.nextUrl.pathname === '/api/users/confirm') {
    // console.log('인증 페이지~~~~~ :)');
    return NextResponse.next();
  }

  if (!cookie_keys.includes(COOKIE_NAME) && req.nextUrl.pathname !== '/auth') {
    console.log('쿠키가 없으니 로그인 페이지로 이동합니다!!!!!!!');
    const url = req.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
