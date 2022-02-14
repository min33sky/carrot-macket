import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;

  console.log('token: ', token);

  return res.status(200).json({
    success: true,
  });
}

export default withHandler('POST', handler);
