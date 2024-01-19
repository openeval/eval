import { CandidateOnAssessmentStatus, type Prisma } from "@prisma/client";
import type { User } from "next-auth";

import { prisma } from "~/server/db";

export async function findInvitedCandidate(
  user: User,
  assessmentId: string,
  email: string,
) {
  return await prisma.candidate.findFirst({
    where: {
      email,
      organizationId: user.activeOrgId,
      candidatesOnAssessments: {
        some: {
          assessmentId: assessmentId,
          status: CandidateOnAssessmentStatus.STARTED,
        },
      },
    },
  });
}

export async function update(
  where: Prisma.CandidateWhereUniqueInput,
  data: Prisma.CandidateUpdateInput,
) {
  return await prisma.candidate.update({ where, data });
}

export async function create(data: Prisma.CandidateCreateInput) {
  return await prisma.candidate.create({ data });
}

export async function findCandidateByUserId(userId) {
  return await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });
}
export async function findOneById(id, organizationId?) {
  return await prisma.candidate.findFirst({
    where: { id, organizationId },
  });
}

export type CandidateFullData = Prisma.PromiseReturnType<typeof findByIdFull>;
export async function findByIdFull(id, organizationId?) {
  return await prisma.candidate.findFirst({
    where: {
      id,
      organizationId,
    },
    include: {
      submissions: {
        include: { review: true, contribution: true, assessment: true },
      },
    },
  });
}
export type CandidateOnAssessmentItems = Prisma.PromiseReturnType<
  typeof findCandidatesByAssessment
>;
export async function findCandidatesByAssessment(assessmentId) {
  return await prisma.candidatesOnAssessments.findMany({
    include: { candidate: true },
    where: {
      assessmentId: assessmentId,
    },
  });
}

export type CandidatesListData = Prisma.PromiseReturnType<
  typeof findAllForList
>;

export async function findAllForList(where: Prisma.CandidateWhereInput) {
  return await prisma.candidate.findMany({
    where,
    select: {
      id: true,
      name: true,
      status: true,
      lastName: true,
      email: true,
      createdAt: true,
      _count: { select: { submissions: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function remove(id: string) {
  return await prisma.candidate.delete({
    where: {
      id: id,
    },
  });
}
