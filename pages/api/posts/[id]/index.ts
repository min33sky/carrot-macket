// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/**
 * 질문 작성 API
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const question = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      _count: {
        select: {
          answers: true,
          curiosities: true,
        },
      },
    },
  });

  //* 요청자가 해당 게시물에 궁금해요를 눌렀는지 정보
  const checkCuriosity = Boolean(
    await client.curiosity.findFirst({
      where: {
        userId: user?.id,
        postId: +id.toString(),
      },
    })
  );

  return res.status(200).json({
    success: true,
    question,
    checkCuriosity,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
