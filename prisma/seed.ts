import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

/**
 * package.json에 seed 스크립트를 추가한 후
 * npx prisma db seed로 Seeding 작업을 한다.
 */
async function seed() {
  [...Array.from(Array(50).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });

    console.log(`${item} / 50`);
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => await client.$disconnect());
