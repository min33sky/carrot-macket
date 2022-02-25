// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      description,
      image: 'temp_image_url',
      name,
      price: +price,
      // ? User Entity의 데이터까지 묶어서 저장
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    product,
  });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  })
);
