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
    const {
      query: { latitude, longitude },
    } = req;

    console.log('위치: ', latitude, longitude);

    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());

    // TODO: 위도 경도가 없을 시 에러 있음

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
      where: {
        latitude: {
          gte: parsedLatitude - 0.05, //? 범위를 사용자가 조절할 수 있게 만들자
          lte: parsedLatitude + 0.05,
        },
        longitude: {
          gte: parsedLongitude - 0.05,
          lte: parsedLongitude + 0.05,
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
