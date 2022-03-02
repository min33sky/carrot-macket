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
    body: { question },
    session: { user },
  } = req;

  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    post,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
