import type { Prisma, User } from "@prisma/client";

import { prisma } from "~/server/db";

export async function create(data: Prisma.UserCreateInput) {
  return await prisma.user.create({ data });
}

export async function findOneById(id: User["id"]) {
  return await prisma.user.findFirst({ where: { id } });
}

export async function findOneByEmail(email: User["email"]) {
  return await prisma.user.findFirst({ where: { email } });
}

export async function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) {
  return await prisma.user.update({ where, data });
}

export async function seed(data: Prisma.UserCreateInput) {
  return await prisma.user.upsert({
    create: data,
    update: {},
    where: { email: data.email as string },
  });
}
