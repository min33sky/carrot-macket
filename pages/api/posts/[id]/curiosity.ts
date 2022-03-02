// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/**
 * 질문글의 궁금해요 처리 API
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  //* 이미 궁금해요를 눌렀는지 확인하기
  const alreadyExists = await client.curiosity.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
    },
    select: {
      id: true, //? id값만 필요하다
    },
  });

  // * 눌렀으면 취소, 아니면 등록
  if (alreadyExists) {
    // 취소
    await client.curiosity.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // 등록
    await client.curiosity.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  return res.status(200).json({
    success: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
