import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;

  console.log('token: ', token);

  //* 토큰이 DB에 존재하는지 확인
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) {
    return res.status(404).json({
      success: false,
    });
  }

  //* 세션에 유저 정보를 추가
  req.session.user = {
    id: exists?.userId,
  };

  //* 쿠키에 암호화된 데이터를 설정
  await req.session.save();

  return res.status(200).json({
    success: true,
  });
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotSession',
  password: '!@#QWEASwqewelkdfsglksjlk!@#dsdlfkjsdflkj#!@3lsdkffjsl!@#sd,fsdjkfsldslkdgfj123#sdf',
});
