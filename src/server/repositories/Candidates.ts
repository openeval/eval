import { prisma } from "~/server/db";
import {
  CandidateOnAssessmentStatus,
  CandidateStatus,
  type User,
} from "@prisma/client";

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
  return await prisma.candidate.update({
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
      status: CandidateStatus.ACCEPTED,
      // candidatesOnAssessments: {
      //   update: {
      //     data: { assessmentId: assessmentId },
      //   },
      // },
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
