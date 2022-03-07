import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

//! TypeError: Do not know how to serialize a BigInt 해결하기

declare global {
  interface BigInt {
    toJSON: () => void;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  //* 프론트에서 전달된 쿠키를 복호화한 세션값으로 유저 정보를 찾는다.
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  return res.status(200).json({
    success: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
