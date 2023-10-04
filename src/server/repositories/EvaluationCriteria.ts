import { prisma } from "~/server/db";

export async function findAllWithChildren() {
  return await prisma.evaluationCriteria.findMany({
    where: { isChild: false },
    include: { children: true },
  });
}
