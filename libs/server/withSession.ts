import { COOKIE_NAME } from 'constants/constants';
import { withIronSessionApiRoute } from 'iron-session/next';

const cookieOptions = {
  cookieName: COOKIE_NAME,
  password: process.env.COOKIE_SECRET,
};

/**
 * Session을 사용할 수 있게해주는 헬퍼 함수
 * @param fn 핸들러 함수
 * @returns
 */
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
