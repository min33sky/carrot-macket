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

    //? Pagination을 위한 설정
    const limit = 5;
    const cursor = req.query.cursor ?? '';
    const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) };

    const streams = await client.stream.findMany({
      take: limit,
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0, //? 이전 쿼리값이 있다면 이전 쿼리의 마지막 값 바로 다음 값부터 가져온다.
    });

    return res.status(200).json({
      success: true,
      streams,
      nextId: streams.length === limit ? streams[limit - 1].id : undefined,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
