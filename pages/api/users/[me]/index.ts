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
  if (req.method === 'GET') {
    const {
      session: { user },
    } = req;

    console.log('세ㅔㅔㅔ션: ', req.session);

    //* 프론트에서 전달된 쿠키를 복호화한 세션값으로 유저 정보를 찾는다.
    const profile = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return res.status(200).json({
      success: true,
      profile,
    });
  }

  // ************************************************************************************************ //

  //* 개인정보 수정
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;

    // 내 정보 가져오기
    const myStatus = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!myStatus) {
      return res.status(404).json({
        success: false,
        message: '해당 계정이 존재하지 않습니다.',
      });
    }

    //* 이메일 변경하기 (값이 변경되었을 때만 업데이트)
    if (email && email !== myStatus.email) {
      //* 같은 이메일이 존재하는지 확인하기
      const emailExists = Boolean(
        await client.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );

      if (emailExists) {
        return res.status(401).json({
          success: false,
          message: '이미 존재하는 이메일입니다.',
        });
      }

      const updated = await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
    }

    //* 핸드폰 변경하기 (값이 변경되었을 때만 업데이트)
    //? BigInt형은 toString()으로 변환해서 비교하자
    if (phone && phone !== myStatus.phone?.toString()) {
      const phoneExists = Boolean(
        await client.user.findFirst({
          where: {
            phone: +phone,
          },
          select: {
            id: true,
          },
        })
      );

      if (phoneExists) {
        return res.status(404).json({
          success: false,
          message: '이미 같은 전화번호가 존재합니다.',
        });
      }

      const updated = await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone: +phone,
        },
      });
    }

    //* 이름 변경
    if (name && name !== myStatus.name) {
      //? 이름은 중복되어도 되니 체크안해도 된다.
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }

    //* 아바타 변경
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: '프로필 정보 변경 완료 :)',
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
