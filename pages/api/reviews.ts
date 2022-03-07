import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;

  //? 나에대해 쓴 리뷰글을 모두 가져온다.
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  console.log('내게 쓴 리뷰들: ', reviews);

  return res.status(200).json({
    success: true,
    reviews,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
