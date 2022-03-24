import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

/**
 * ? Next의 Hot reload때문에 Prisma 인스턴스가 계속 새로 생기는걸 막기위해
 * ? 하나의 인스턴스만 생성하도록 설정한다.
 */
const client = global.client || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV === 'development') {
  global.client = client;
}

export default client;
