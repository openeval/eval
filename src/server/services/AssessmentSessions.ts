import "server-only";

import { AssessmentSessionStatus } from "@prisma/client";

import { prisma } from "~/server/db";

export async function create(data) {
  return await prisma.assessmentSession.create({ data });
}

export async function fetchAssessmentSession(id) {
  return await prisma.assessmentSession.findFirst({
    where: { id },
    include: { assessment: true },
  });
}

export async function findOneById(id) {
  return await prisma.assessmentSession.findFirst({
    where: { id },
    include: { assessment: { include: { reviewers: true } } },
  });
}

export async function findOneByCandidate(id, candidateId) {
  return await prisma.assessmentSession.findFirst({
    where: { id, candidateId, status: AssessmentSessionStatus.STARTED },
    include: { assessment: { include: { reviewers: true } } },
  });
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
