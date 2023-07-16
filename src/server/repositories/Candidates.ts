import { prisma } from "~/server/db";
import { CandidateStatus, type User } from "@prisma/client";

export async function findInvitedCandidate(
  user: User,
  assessmentId: string,
  email: string,
) {
  return await prisma.candidate.findFirst({
    where: {
      email,
      organizationId: user.activeOrgId,
      assessments: {
        some: {
          id: assessmentId,
        },
      },
      status: { in: CandidateStatus.ACCEPTED },
    },
  });
}

export async function linkInvitedUser(
  user: Partial<User>,
  assessmentId: string,
) {
  return await prisma.candidate.updateMany({
    where: {
      email: user.email as string,
      assessments: {
        some: {
          id: assessmentId,
        },
      },
    },
    data: {
      userId: user.id,
      status: CandidateStatus.ACCEPTED,
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
  return await prisma.candidate.findFirstOrThrow({
    where: {
      id,
    },
  });
}
