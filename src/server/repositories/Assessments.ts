import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.assessment.findMany();
}
