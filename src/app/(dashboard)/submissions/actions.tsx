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
import { getTotalScore } from "~/server/services/EvaluationCriteria";
import * as reviewsService from "~/server/services/Reviews";
import * as submissionsService from "~/server/services/Submissions";
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

  const submission = await submissionsService.findByIdFull(submissionId);

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

    const submissionUpdated =
      await submissionsService.findByIdFull(submissionId);

    if (submissionUpdated) {
      //update the submission status and score
      await submissionsService.update(submissionId, {
        status: SubmissionStatus.REVIEWED,
        // avg score
        score: Math.ceil(
          submissionUpdated.reviews.reduce((a, b) => a + b.score, 0) /
            submission.reviews.length || 0,
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

  const review = await reviewsService.findOneById(reviewId);

  if (!review) {
    notFound();
  }

  const submission = await submissionsService.findOneById(review?.submissionId);

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

    await reviewsService.remove(reviewId);

    const submissionUpdated = await submissionsService.findByIdFull(
      submission.id,
    );

    if (submissionUpdated) {
      //update the submission status and score
      await submissionsService.update(submission.id, {
        ...(submissionUpdated.reviews.length === 0 && {
          status: SubmissionStatus.TO_REVIEW,
        }),
        score: Math.ceil(
          submissionUpdated.reviews.reduce((a, b) => a + b.score, 0) /
            submission.reviews.length || 0,
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

export const rejectSubmissionAction = async (submissionId) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const submission = await submissionsService.findByIdFull(submissionId);

  if (!submission || submission.organizationId !== user.activeOrgId) {
    notFound();
  }

  try {
    if (submission.status === SubmissionStatus.REJECTED) {
      throw Error("Invalid submission status");
    }

    //update the submission status and score
    await submissionsService.update(submissionId, {
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
