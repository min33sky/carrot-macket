import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import axios from 'axios';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  /**
   *? Cloudflare에 이미지를 업로드 할 수있는 URL을 요청한다.
   */
  const response = await axios
    .post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_TOKEN}`,
        },
      }
    )
    .then((res) => res.data);

  console.log('CF Image URL : ', response);

  res.json({
    success: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
