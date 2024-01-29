import type { Prisma, Review, Submission } from "@prisma/client";

import { prisma } from "~/server/db";
import { getDetailScore } from "~/server/repositories/EvaluationCriteria";

export async function findOneById(id) {
  return await prisma.submission.findFirst({
    where: { id },
    include: { assessment: true, reviews: true },
  });
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
    include: { contribution: true, reviews: true, assessment: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findByCandidateOnAssessment(
  candidateId: string,
  assessmentId: string,
) {
  return await prisma.submission.findFirst({
    where: { candidateId, assessmentId },
  });
}

export type SubmissionFullData = Prisma.PromiseReturnType<
  typeof findByIdFull & {
    reviews: [Review & { plot: { series: number[]; labels: string[] } }];
  }
>;

export async function findByIdFull(
  id: Submission["id"],
  withOptions: { plotReviewsData?: boolean } = {},
) {
  let data = await prisma.submission.findFirst({
    where: { id },
    include: {
      assessment: true,
      contribution: true,
      candidate: true,
      reviews: { include: { evaluationCriterias: true, createdBy: true } },
    },
  });

  if (withOptions.plotReviewsData) {
    data = {
      ...data,
      // @ts-expect-error forget
      reviews: await Promise.all(
        // @ts-expect-error TODO: improve this async method
        data?.reviews.map(async (review) => {
          const plotData = await getDetailScore(
            review.evaluationCriterias.map((value) => value.id),
          );

          const plot = plotData.reduce(
            (plot, item) => {
              if (item.score > 0) {
                return {
                  ...plot,
                  series: [...plot.series, Math.round(item.score * 100) / 100],
                  labels: [...plot.labels, item.name],
                };
              }
              return plot;
            },
            { series: [], labels: [] },
          );
          return { ...review, plot };
        }),
      ),
    };
  }

  return data;
}

export async function update(id: string, data: Prisma.SubmissionUpdateInput) {
  return await prisma.submission.update({ where: { id }, data });
}

export async function create(data: Prisma.SubmissionCreateInput) {
  return await prisma.submission.create({ data });
}
