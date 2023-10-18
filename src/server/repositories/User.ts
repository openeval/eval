import type { Prisma } from "@prisma/client";

import { prisma } from "~/server/db";

export async function update(where, data) {
  return await prisma.user.update({ where, data });
}

export async function seed(data: Prisma.UserCreateInput) {
  return await prisma.user.upsert({
    create: data,
    update: {},
    where: { email: data.email },
  });
}
