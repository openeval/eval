import "server-only";

import { CandidateStatus, Prisma, SubmissionStatus } from "@prisma/client";

import { prisma } from "~/server/db";

export async function getTotalVerifiedCandidates(organizationId) {
  const date = new Date();
  const startCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  return prisma.candidate.count({
    where: {
      organizationId,
      status: CandidateStatus.VERIFIED,
      verifiedAt: { gt: startCurrentMonth },
    },
  });
}

export async function getTotalSubmissions(organizationId) {
  return prisma.submission.count({
    where: { organizationId, status: SubmissionStatus.TO_REVIEW },
  });
}

export async function getContributedHours(organizationId) {
  const result = await prisma.$queryRaw<
    [
      {
        contributed_hours: number;
      },
    ]
  >(Prisma.sql`SELECT
  SUM(TRUNC(EXTRACT(EPOCH FROM (finished_at - started_at)) /3600) ) AS contributed_hours
  FROM
      assessment_session AS a
  JOIN
      assessment AS b ON a.assessment_id = b.id
  WHERE
     b.organization_id = ${organizationId}::uuid
      AND a.finished_at IS NOT NULL
      AND EXISTS (
          SELECT
              1
          FROM
              submission AS s
          WHERE
              s.assessment_session_id = a.id
      );`);

  return result[0]?.contributed_hours;
}
