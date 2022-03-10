import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
  });

  if (!stream) {
    return res.status(404).json({
      success: false,
      message: '스트림이 존재하지 않습니다.',
    });
  }

  return res.status(200).json({
    success: true,
    stream,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
