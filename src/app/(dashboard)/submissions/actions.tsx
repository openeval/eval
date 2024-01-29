"use server";

import {
  MembershipRole,
  SubmissionStatus,
  type Review,
  type Submission,
} from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import { getTotalScore } from "~/server/repositories/EvaluationCriteria";
import * as reviewsRepo from "~/server/repositories/Reviews";
import * as submissionsRepo from "~/server/repositories/Submissions";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type SubmitReviewAction = (
  id: Submission["id"],
  data: { id?: string; note: string; evaluationCriterias: number[] },
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

  if (!submission || submission.organizationId !== user.activeOrgId) {
    notFound();
  }

  try {
    if (submission.status === SubmissionStatus.REJECTED) {
      throw Error("You can't update rejected submissions");
    }

    const score = await getTotalScore(data.evaluationCriterias);

    const { evaluationCriterias, ...payload } = data;

    const review = await prisma.review.upsert({
      where: { submissionId: submissionId, id: data.id },
      create: {
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
        score,
      },
      update: {
        ...payload,
        evaluationCriterias: {
          connect:
            evaluationCriterias && evaluationCriterias.map((c) => ({ id: c })),
        },
        score,
      },
    });

    const submissionUpdated = await submissionsRepo.findByIdFull(submissionId);

    if (submissionUpdated) {
      //update the submission status and score
      await submissionsRepo.update(submissionId, {
        status: SubmissionStatus.REVIEWED,
        score: Math.ceil(
          submissionUpdated.reviews.reduce((a, b) => a + b.score, 0) /
            submission.reviews.length,
        ),
      });
    }

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

export const deleteReviewAction = async (reviewId) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const review = await reviewsRepo.findOneById(reviewId);

  if (!review) {
    notFound();
  }

  const submission = await submissionsRepo.findOneById(review?.submissionId);

  if (!submission) {
    notFound();
  }

  try {
    const roles = [MembershipRole.OWNER, MembershipRole.ADMIN];

    if (
      user.id !== review.createdById &&
      !roles.includes(user.membership.role)
    ) {
      throw Error("forbidden");
    }

    const score = review.score;

    await reviewsRepo.remove(reviewId);

    //update the submission status and score
    await submissionsRepo.update(submission.id, {
      // TODO: set a service to calculate scores
      score: Math.ceil(
        (submission.score - score) / (submission.reviews.length - 1),
      ),
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

export const rejectSubmissionAction = async (submissionId) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const submission = await submissionsRepo.findByIdFull(submissionId);

  if (!submission || submission.organizationId !== user.activeOrgId) {
    notFound();
  }

  try {
    if (submission.status === SubmissionStatus.REJECTED) {
      throw Error("Invalid submission status");
    }

    //update the submission status and score
    await submissionsRepo.update(submissionId, {
      status: SubmissionStatus.REJECTED,
      score: 0,
    });

    return { success: true, data: { message: "ok" } };
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
