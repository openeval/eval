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
          status: CandidateOnAssessmentStatus.ACCEPTED,
        },
      },
    },
  });
}

/**
 * Link invited users from assessments to candidates
 * when they loging for the first time
 * @param user
 * @param assessmentId
 */
export async function linkInvitedUser(
  user: Partial<User>,
  assessmentId: string,
) {
  const candidate = await prisma.candidate.update({
    where: {
      email: user.email as string,
      candidatesOnAssessments: {
        some: {
          assessmentId: assessmentId,
        },
      },
    },
    data: {
      userId: user.id,
    },
  });

  await prisma.candidatesOnAssessments.update({
    // @ts-expect-error check the candidate on assessment mtm
    where: {
      assessmentId: assessmentId,
      candidateId: candidate.id,
    },
    data: {
      status: CandidateOnAssessmentStatus.ACCEPTED,
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

export async function findCandidatesByAssessment(assessmentId) {
  return await prisma.candidate.findMany({
    where: {
      candidatesOnAssessments: {
        some: { assessmentId: assessmentId },
      },
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
