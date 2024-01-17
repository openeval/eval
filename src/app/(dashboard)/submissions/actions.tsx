"use server";

import {
  SubmissionStatus,
  type Prisma,
  type Review,
  type Submission,
} from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import { getTotalScore } from "~/server/repositories/EvaluationCriteria";
import * as submissionsRepo from "~/server/repositories/Submissions";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type SubmitReviewAction = (
  id: Submission["id"],
  data: Prisma.ReviewCreateInput & { evaluationCriterias: number[] },
) => Promise<ActionResponse<Review>>;

export const submitReviewAction: SubmitReviewAction = async (
  submissionId,
  data,
) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const submission = await submissionsRepo.findByIdFull(submissionId);

  if (!submission) {
    notFound();
  }

  try {
    if (submission.status === SubmissionStatus.REJECTED) {
      throw Error("Invalid submission status");
    }

    const totalScore = await getTotalScore(data.evaluationCriterias);

    const { evaluationCriterias, ...payload } = data;
    const review = await prisma.review.create({
      data: {
        ...payload,
        evaluationCriterias: {
          connect:
            evaluationCriterias && evaluationCriterias.map((c) => ({ id: c })),
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

    //update the submission status
    await submissionsRepo.update(submissionId, {
      status: SubmissionStatus.REVIEWED,
    });

    return { success: true, data: review };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: createError(
          "Incorrect format",
          ERROR_CODES.BAD_REQUEST,
          error.issues,
        ),
      };
    }

    return { success: false, error: { message: "something went wrong" } };
  }
};
