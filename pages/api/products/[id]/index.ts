// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  //* 좋아요를 누른 상품인지 확인
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        userId: user?.id,
        productId: +id.toString(),
      },
    })
  );

  //* 연관 된 상품 찾기 (상품 이름이 포함되어 있는 상품을 찾기)
  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id, //? 지금 등록하는 제품은 제외
        },
      },
    },
  });

  console.log('연관 된 상품 목록: ', relatedProducts);

  return res.status(200).json({
    success: true,
    product,
    relatedProducts,
    isLiked,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  })
);
