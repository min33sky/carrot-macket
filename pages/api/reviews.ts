import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;

  //? 나에 대해 쓴 리뷰글을 모두 가져온다.
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    // 리뷰 작성자 정보도 가져오기
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
