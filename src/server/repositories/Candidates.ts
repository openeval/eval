import { prisma } from "~/server/db";
import { CandidateStatus, type User } from "@prisma/client";

export async function findInvitedCandidate(
  user: User,
  assessmentId: string,
  email: string
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
      status: { notIn: CandidateStatus.PENDING },
    },
  });
}
