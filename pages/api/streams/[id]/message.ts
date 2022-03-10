import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
    body: { message },
  } = req;

  const chat = await client.message.create({
    data: {
      message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    message: chat,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
