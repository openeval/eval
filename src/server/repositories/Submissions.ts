import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.submission.findMany();
}

export async function findByAssessmentId(assessmentId: string) {
  return await prisma.submission.findMany({
    where: { assessmentId },
    include: { contributions: true },
  });
}
