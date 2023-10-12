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

export async function findAllForList(where) {
  return await prisma.submission.findMany({
    where,
    include: { contribution: true, reviews: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findByAssessmentId(assessmentId: string) {
  return await prisma.submission.findMany({
    where: { assessmentId },
    include: { contribution: true, reviews: true },
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
      reviews: { include: { evaluationCriterias: true } },
    },
  });

  if (data) {
    if (withOptions.plotReviewsData) {
      for (let i = 0; i < data.reviews.length; i++) {
        const plotData = await getDetailScore(
          data.reviews[i].evaluationCriterias.map((value) => value.id),
        );
        const series = plotData.map((item) => item.score);
        const labels = plotData.map((item) => item.name);

        data.reviews[i] = {
          ...data.reviews[i],
          plot: { series: series, labels: labels },
        };
      }
    }
  }

  return data;
}
