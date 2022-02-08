// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.user.create({
    data: {
      name: 'messi',
      email: 'messi@naver.com',
      phone: 1113322,
    },
  });

  res.json({
    ok: true,
  });
}
