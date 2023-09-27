import { prisma } from "~/server/db";

export async function findOneById(id) {
  return await prisma.submission.findFirst(id);
}

export async function findAll() {
  return await prisma.submission.findMany();
}

export async function findByAssessmentId(assessmentId: string) {
  return await prisma.submission.findMany({
    where: { assessmentId },
    include: { contributions: true },
  });
}

export async function findByIdFull(id) {
  return await prisma.submission.findFirst({
    where: { id },
    include: {
      contributions: true,
      reviews: true,
    },
  });
}
