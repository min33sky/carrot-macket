import { COOKIE_NAME } from 'constants/constants';
import { withIronSessionApiRoute } from 'iron-session/next';

const cookieOptions = {
  cookieName: COOKIE_NAME,
  password: process.env.COOKIE_SECRET,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
