// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/**
 * 질문글에 대한 답변 처리 API
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  //* 질문 글이 존재하는 지 확인
  const postExists = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
  });

  if (!postExists)
    return res.status(404).json({
      success: false,
      message: '존재하지 않는 게시물입니다.',
    });

  //* 답변 등록
  const newAnswer = await client.answer.create({
    data: {
      answer,
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

  return res.status(200).json({
    success: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
