import { prisma } from "../src/server/db";
import type { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Ivan Horomanski",
    email: "idhard@gmail.com",
    emailVerified: new Date(),
    completedOnboarding: false,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.upsert({
      create: u,
      update: {},
      where: { email: u.email },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
