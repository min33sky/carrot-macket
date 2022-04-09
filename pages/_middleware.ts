import { AUTH_COOKIE } from 'constants/auth';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  //* 봇 차단
  if (req.ua?.isBot) {
    return new Response("Plz don't be a bot. Be human.", { status: 403 });
  }

  //* 쿠키 가져오기
  const cookie_keys = Object.keys(req.cookies);
  console.log('[middleware] cookies: ', cookie_keys);

  //* 인증하지 않았다면 인증 페이지로 리다이렉트 (api 호출은 필터링 제외)
  if (!req.url.includes('/api')) {
    if (!cookie_keys.includes(AUTH_COOKIE) && !req.url.includes('/auth')) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth';
      return NextResponse.redirect(url);
    }
  }

  //? 유저의 위치 정보를 알 수 있지만 localhost에서는 작동 안함
  // console.log(req.geo)
}
