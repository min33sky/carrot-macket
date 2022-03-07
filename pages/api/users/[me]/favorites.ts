import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;

  //* 내가 관심있는 상품들을 모두 가져온다.
  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    result: {
      favorites,
    },
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
