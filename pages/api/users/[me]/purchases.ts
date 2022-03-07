import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;

  //* 내가 구매한 상품들을 모두 가져온다.
  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  return res.status(200).json({
    success: true,
    purchases,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
