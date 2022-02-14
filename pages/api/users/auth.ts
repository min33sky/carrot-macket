// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;

  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: 'qwe1',
      user: {
        //? 기존 유저가 존재하면 생성한 토큰과 연결하고 없으면 둘 다 생성하고 연결한다
        connectOrCreate: {
          create: {
            name: 'Anonymous',
            ...payload,
          },
          where: {
            ...payload,
          },
        },
      },
    },
  });

  console.log(token);

  return res.status(200).json({ success: true });
}

export default withHandler('POST', handler);
