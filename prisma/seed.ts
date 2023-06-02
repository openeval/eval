import { prisma } from "../src/server/db";
import type { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@useeval.com",
    completedOnboarding: false,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
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
