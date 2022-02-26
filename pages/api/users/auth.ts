// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import twilio from 'twilio';
import mail from '@sendgrid/mail';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email, username } = req.body;

  //? 유저의 로그인 방식 선택
  const user = phone ? { phone: +phone } : email ? { email } : null;

  //* 6자리의 랜덤수를 생성 (토큰값으로 사용)
  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  if (!user) {
    return res.status(400).json({ success: false });
  }

  //* 토큰과 유저 계정 생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        //? 기존 유저가 존재하면 생성한 토큰과 연결하고 없으면 둘 다 생성하고 연결한다
        connectOrCreate: {
          create: {
            name: 'Anonymous', //? 임시 이름
            username, //? 닉네임
            ...user,
          },
          where: {
            ...user,
          },
        },
      },
    },
  });

  //* 생성한 토큰을 인증 수단을 통해 전달하기 (개발중일땐 꺼놓자 아까워)
  // if (phone) {
  //   //? Twilio Trial Version이라 to에 내 전화번호만 가능하다.
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  //     to: process.env.MY_PHONE_NUMBER,
  //     body: `Your Login Token is ${payload}.`,
  //   });

  //   console.log(message);
  // } else if (email) {
  //   const email = await mail.send({
  //     from: 'min33sky@naver.com',
  //     to: 'min33sky@naver.com', //? 테스트 용이므로 내 메일을 쓴다
  //     subject: 'Your Carrot Market Verification Email',
  //     text: `Your token is ${payload}`,
  //     html: `<stromg>Your token is ${payload}</stromg>`,
  //   });
  //   console.log(email);
  // }

  console.log('생성한 토큰 값: ', token);

  return res.status(200).json({
    success: true,
    token,
  });
}

export default withHandler({
  method: 'POST',
  handler,
  isPrivate: false,
});
