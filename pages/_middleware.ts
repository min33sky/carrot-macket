import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie_keys = Object.keys(req.cookies);

  console.log('[middleware] cookies: ', cookie_keys);
  return NextResponse.next();

  // if (!cookie_keys.includes(COOKIE_NAME)) {
  //   console.log('쿠키가 없으니 로그인 페이지로 이동합니다!!!!!!!');
  //   const url = req.nextUrl;
  //   url.pathname = '/auth';
  //   return NextResponse.rewrite(url);
  // } else {
  //   return NextResponse.next();
  // }
}
