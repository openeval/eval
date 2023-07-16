import { prisma } from "~/server/db";

export async function update(where, data) {
  return await prisma.user.update({ where, data });
}
