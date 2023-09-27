import { prisma } from "~/server/db";
import { CandidateOnAssessmentStatus, CandidateStatus } from "@prisma/client";
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

// TODO: set on relationship not on the user
export async function linkInvitedUser(
  user: Partial<User>,
  assessmentId: string,
) {
  return await await prisma.$transaction([
    prisma.candidate.update({
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
    }),
    prisma.candidatesOnAssessments.update({
      // @ts-expect-error users will by always candidates
      where: {
        assessmentId: assessmentId,
        // @ts-expect-error users will by always candidates
        candidateId: user.candidate.id,
      },
      data: {
        status: CandidateOnAssessmentStatus.ACCEPTED,
      },
    }),
  ]);
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
