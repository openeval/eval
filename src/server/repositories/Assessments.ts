import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.assessment.findMany();
}

export async function findOneById(id, organizationId?) {
  return await prisma.assessment.findFirst({
    where: { id, organizationId },
  });
}

export async function update(where, data) {
  return await prisma.assessment.update({ where, data });
}

export async function findByCandidate(candidateId) {
  return await prisma.candidatesOnAssessments.findMany({
    select: { assessment: true },
    where: { candidateId: candidateId },
  });
}

export async function update(where, data) {
  return await prisma.user.update({ where, data });
}
