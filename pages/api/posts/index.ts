// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/**
 * 동네 생활 글 작성 및 모든 게시물 가져오기 API
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  // 질문 글 작성
  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    console.log('시ㅣㅣㅣㅣ발: ', question, latitude, longitude);

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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

  // 모든 질문 게시물 가져오기
  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      include: {
        _count: {
          select: {
            answers: true,
            curiosities: true,
          },
        },
        user: {
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
      posts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  })
);
