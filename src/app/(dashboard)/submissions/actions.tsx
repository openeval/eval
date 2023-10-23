"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { getTotalScore } from "~/server/repositories/EvaluationCriteria";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function submitReviewAction(submissionId, data) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  try {
    const totalScore = await getTotalScore(data.evaluationCriterias);
    const { evaluationCriterias, ...payload } = data;
    const review = await prisma.review.create({
      data: {
        ...payload,
        evaluationCriterias: {
          connect: evaluationCriterias.map((c) => ({ id: c })),
        },
        submission: { connect: { id: submissionId } },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        totalScore,
      },
    });

    return review;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return JSON.stringify(e.issues);
    }

    throw new Error("something went wrong");
  }
}
