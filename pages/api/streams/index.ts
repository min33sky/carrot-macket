import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { name, price, description },
    } = req;

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      stream,
    });
  }

  if (req.method === 'GET') {
    const {
      session: { user },
    } = req;

    const streams = await client.stream.findMany({
      take: 10,
      skip: 0, //TODO:  page * take
    });

    return res.status(200).json({
      success: true,
      streams,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
