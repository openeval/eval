import { prisma } from "~/server/db";
import { getDetailScore } from "~/server/repositories/EvaluationCriteria";
import type { Prisma } from "@prisma/client";
export async function findOneById(id) {
  return await prisma.submission.findFirst(id);
}

export async function findAll() {
  return await prisma.submission.findMany();
}

export type SubmissionsListData = Prisma.PromiseReturnType<
  typeof findAllForList
>;

export async function findAllForList(where: Prisma.SubmissionWhereInput) {
  return await prisma.submission.findMany({
    where,
    include: { contribution: true, review: true, assessment: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findByAssessmentId(assessmentId: string) {
  return await prisma.submission.findMany({
    where: { assessmentId },
    include: { contribution: true, review: true },
  });
}

export async function findByIdFull(
  id,
  withOptions: { plotReviewsData?: boolean } = {},
) {
  const data = await prisma.submission.findFirst({
    where: { id },
    include: {
      contribution: true,
      review: { include: { evaluationCriterias: true } },
    },
  });

  if (data && data.review) {
    if (withOptions.plotReviewsData) {
      const plotData = await getDetailScore(
        data.review.evaluationCriterias.map((value) => value.id),
      );
      const series = plotData.map((item) => item.score);
      const labels = plotData.map((item) => item.name);

      data.review = {
        ...data.review,
        plot: { series: series, labels: labels },
      };
    }
  }

  return data;
}
