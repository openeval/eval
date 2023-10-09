import type { EvaluationCriteria } from "@prisma/client";
import { prisma } from "~/server/db";

// returns only one hierarchy level
// only native queries support recursive fetching
// https://github.com/prisma/prisma/issues/3725
export async function findAllWithChildren() {
  return await prisma.evaluationCriteria.findMany({
    where: { parentId: null },
    include: { children: true },
  });
}

function calculateScore(criterion, review) {
  const includes = criterion.children.filter((element) =>
    review.includes(element.id),
  );
  // each category defines the weight of its childs
  const criterionScore =
    (criterion.weight / criterion.children.length) * includes.length;

  return criterionScore;
}

function calculateTotalScore(criteriaData, review: number[]) {
  let totalScore = 0;
  criteriaData.forEach((criterion) => {
    const criterionScore = calculateScore(criterion, review);

    totalScore += criterionScore;
  });

  return totalScore;
}

// calculate the total score based on review criteria
export async function getTotalScore(criterion: number[]) {
  const criteria = await findAllWithChildren();

  const totalScore = calculateTotalScore(criteria, criterion);

  return totalScore;
}

// return the score to be ploted by category
export async function getDetailScore(review) {
  const criteriaData = await findAllWithChildren();

  const response = criteriaData.map((criterion) => {
    const score = calculateScore(criterion, review);
    return { ...criterion, score };
  });

  return response;
}
