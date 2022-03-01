// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/**
 * 관심 상품에 관한 데이터를 처리하는 핸들러
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  //* 이미 좋아요를 누른 상품인지 확인
  const alreadyExists = await client.favorite.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  //* 상품이 좋아요 상태일 시 좋아요 취소, 아니면 좋아요 추가하기
  if (alreadyExists) {
    await client.favorite.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
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
