import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.assessment.findMany();
}

export async function findOneById(id) {
  return await prisma.assessment.findFirstOrThrow({ where: { id } });
}
