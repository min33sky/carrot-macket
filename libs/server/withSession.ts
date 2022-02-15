import { withIronSessionApiRoute } from 'iron-session/next';

const cookieOptions = {
  cookieName: 'carrotSession',
  password: process.env.COOKIE_SECRET,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
