import { AssessmentSessionStatus } from "@prisma/client";
import { prisma } from "~/server/db";

export async function create(data) {
  return await prisma.assessmentSession.create({ data });
}

export async function findActiveSession(candidateId, assessmentId) {
  return await prisma.assessmentSession.findFirst({
    where: {
      candidateId: candidateId,
      assessmentId: assessmentId,
      status: AssessmentSessionStatus.STARTED,
    },
  });
}
