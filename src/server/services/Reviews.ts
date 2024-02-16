import "server-only";

import { prisma } from "~/server/db";

export async function findOneById(id: string) {
  return await prisma.review.findFirst({
    where: { id },
    include: { submission: true },
  });
}

export async function remove(id) {
  return await prisma.review.delete({
    where: { id },
  });
}
