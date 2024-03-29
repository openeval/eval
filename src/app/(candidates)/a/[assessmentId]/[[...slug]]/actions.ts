"use server";

import {
  AssessmentStatus,
  CandidateOnAssessmentStatus,
  CandidateStatus,
  type AssessmentSession,
} from "@prisma/client";
import { add } from "date-fns";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { absoluteUrl } from "~/lib/utils";
import { getServerSession } from "~/server/auth";
import { ERROR_CODES, ErrorResponse } from "~/server/error";
import * as assessmentsService from "~/server/services/Assessments";
import * as assessmentSessionsService from "~/server/services/AssessmentSessions";
import * as candidatesService from "~/server/services/Candidates";
import type { ActionResponse } from "~/types";

export type StartAssessmentSessionAction = (
  assessmentId: string,
) => Promise<ActionResponse<AssessmentSession>>;

export async function startAssessmentSessionAction(
  assessmentId: string,
): Promise<ActionResponse<AssessmentSession>> {
  const session = await getServerSession();
  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const assessment = await assessmentsService.findOneById(assessmentId);

  if (!assessment) {
    notFound();
  }

  const candidate = await candidatesService.findCandidateByUserId(
    user.id,
    assessment.organizationId,
  );

  if (!candidate || candidate.status === CandidateStatus.PENDING) {
    redirect(
      `/onboarding/candidate/?orgId=${assessment.organizationId}&step=github-connect&callbackUrl=${absoluteUrl() + "a/" + assessmentId}`,
    );
  }

  try {
    if (candidate.status === CandidateStatus.ARCHIVED) {
      throw new Error("Invalid Candidate");
    }

    const validAssessmentsStatus = [
      AssessmentStatus.ACTIVE,
      AssessmentStatus.IN_PROGRESS,
    ];

    if (!validAssessmentsStatus.includes(assessment.status)) {
      throw new Error("Invalid assessment");
    }

    const session = await assessmentSessionsService.findActiveSession(
      candidate?.id,
      assessmentId,
    );

    if (session) {
      return ErrorResponse(
        "candidate already started a session",
        ERROR_CODES.BAD_REQUEST,
      );
    }

    const response = await assessmentSessionsService.create({
      assessment: { connect: { id: assessmentId } },
      expiresAt: add(new Date(), {
        days: Number(assessment.evaluationPeriodDays) || 1,
      }),
      candidate: {
        connect: { id: candidate?.id },
      },
    });

    await assessmentsService.updateCandidateAssessmentStatus(
      assessmentId,
      candidate.id,
      CandidateOnAssessmentStatus.STARTED,
    );

    return { success: true, data: response };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ErrorResponse(
        "Incorrect format",
        ERROR_CODES.BAD_REQUEST,
        error.issues,
      );
    }

    return ErrorResponse();
  }
}
