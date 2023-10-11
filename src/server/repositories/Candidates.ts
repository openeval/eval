import { prisma } from "~/server/db";
import { CandidateOnAssessmentStatus } from "@prisma/client";
import { User } from "next-auth";

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

export async function update(where, data) {
  return await prisma.candidate.update({ where, data });
}

export async function create(data) {
  return await prisma.candidate.create({ data });
}

export async function findCandidateByUserId(userId) {
  return await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });
}

export async function findById(id) {
  return await prisma.candidate.findFirst({
    where: {
      id,
    },
  });
}

export async function findCandidatesByAssessment(assessmentId) {
  return await prisma.candidate.findMany({
    where: {
      candidatesOnAssessments: {
        every: { assessmentId: assessmentId },
      },
    },
  });
}
