import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;

  //* 토큰이 DB에 존재하는지 확인
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  //* 토큰이 존재하지 않을 시 로그인 실패
  if (!foundToken) {
    return res.status(404).json({
      success: false,
      message: '올바른 토큰값이 아닙니다.',
    });
  }

  //* 세션에 유저 관련 정보를 저장한다.
  //? (iron-session의 withIronSessionApiRoute에 라우트 함수가 랩핑 되어야 session 사용 가능)
  req.session.user = {
    id: foundToken.userId,
  };

  //* 세션 정보를 암호화해서 쿠키로 전달한다.
  await req.session.save();

  //* 해당 유저와 연결된 토큰들을 모두 제거한다. (쿠키에 암호화되니 유저 정보가 있으니  토큰은 더이상 필요없다.)
  const temp = await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  console.log('###### 시발 #######');

  return res.status(200).json({
    success: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: false,
  })
);
