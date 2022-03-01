import type { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  success: boolean;
  [key: string]: any;
}

type MethodType = 'GET' | 'POST' | 'DELETE';

/**
 *
 */
interface IConfigOptions {
  methods: MethodType[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean; // 로그인 유저만 접근할 수 있는지 여부
}

/**
 * 넥스트 라우팅 함수를 리턴하는 헬퍼 함수
 * @param config config object
 * - methods: HTTP Method
 * - handler: handler function
 * - isPrivate: Service to require session (default: true)
 * @returns
 */
export default function withHandler({ methods, handler, isPrivate = true }: IConfigOptions) {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method && !methods.includes(req.method as MethodType)) {
      console.log('[withHandler] 허용되지 않은 Http Method 입니다...');
      return res.status(405).end();
    }

    if (isPrivate && !req.session.user) {
      return res.status(401).json({
        success: false,
        message: '로그인이 필요한 서비스입니다.',
      });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  };
}
