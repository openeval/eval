import type { Prisma } from "@prisma/client";

import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.assessment.findMany();
}

export type AssessmentsListData = Prisma.PromiseReturnType<
  typeof findAllForList
>;

export async function findAllForList(where: Prisma.AssessmentWhereInput) {
  return await prisma.assessment.findMany({
    where,
    select: {
      _count: {
        select: {
          candidatesOnAssessments: true,
          submissions: true,
        },
      },
      id: true,
      title: true,
      status: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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
    include: { assessment: true },
    where: { candidateId: candidateId },
  });
}

export type CandidateAssessmentsFullData = Prisma.PromiseReturnType<
  typeof findAllForForCandidateList
>;

export async function findAllForForCandidateList(candidateId: string) {
  return await prisma.candidatesOnAssessments.findMany({
    include: {
      assessment: {
        include: { applicantSessions: { where: { candidateId } } },
      },
    },
    where: { candidateId: candidateId },
  });
}

export async function updateCandidateAssessmentStatus(
  assessmentId,
  candidateId,
  status,
) {
  return await prisma.candidatesOnAssessments.update({
    data: { status: status },
    where: {
      candidateId_assessmentId: { candidateId: candidateId, assessmentId },
    },
  });
}
