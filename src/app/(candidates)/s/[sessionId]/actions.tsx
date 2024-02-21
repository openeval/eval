"use server";

import type { components } from "@octokit/openapi-types";
import {
  AssessmentSessionStatus,
  CandidateOnAssessmentStatus,
  type AssessmentSession,
} from "@prisma/client";
import { render } from "@react-email/render";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { NotificationEmail } from "~/emails/NotificationEmail";
import { absoluteUrl } from "~/lib/utils";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { ERROR_CODES, ErrorResponse } from "~/server/error";
import { transporter } from "~/server/mailer";
import * as assessmentsService from "~/server/services/Assessments";
import * as assessmentSessionsService from "~/server/services/AssessmentSessions";
import * as candidatesService from "~/server/services/Candidates";
import * as submissionsService from "~/server/services/Submissions";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components
export type FinishAssessmentSessionAction = (
  sessionId: string,
  contribution: components["schemas"]["issue-search-result-item"],
) => Promise<ActionResponse<AssessmentSession>>;

export async function finishAssessmentSessionAction(
  sessionId: string,
  contribution: components["schemas"]["issue-search-result-item"],
): Promise<ActionResponse<AssessmentSession>> {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const assessmentSession =
    await assessmentSessionsService.findOneById(sessionId);

  if (!assessmentSession) {
    notFound();
  }

  try {
    if (assessmentSession.status !== AssessmentSessionStatus.STARTED) {
      throw new Error("Invalid session");
    }

    const candidate = await candidatesService.findCandidateByUserId(
      user.id,
      assessmentSession.assessment.organizationId,
    );

    if (!candidate) {
      throw new Error("candidate do not exist");
    }

    const response = await prisma.assessmentSession.update({
      where: { id: sessionId },
      data: {
        finishedAt: new Date(),
        status: AssessmentSessionStatus.FINISHED,
        submission: {
          create: {
            candidateId: candidate.id,
            assessmentId: assessmentSession.assessment.id,
            organizationId: assessmentSession.assessment.organizationId,
            contribution: {
              create: {
                title: contribution.title,
                description: contribution.body,
                url: contribution.html_url,
                repo: contribution.repository_url,
                state: contribution.state,
                contributorId: candidate.id,
                meta: contribution,
              },
            },
          },
        },
      },
    });

    await assessmentsService.updateCandidateAssessmentStatus(
      assessmentSession.assessment.id,
      candidate.id,
      CandidateOnAssessmentStatus.FINISHED,
    );

    // send email notification to reviewers
    const { assessment } = assessmentSession;

    const submission = await submissionsService.findByCandidateOnAssessment(
      candidate.id,
      assessmentSession.assessment.id,
    );

    if (!submission) {
      throw new Error("submission do not exist");
    }

    // TODO: we should allow owners to get notifications too
    if (assessment.reviewers.length > 0) {
      const html = render(
        <NotificationEmail
          url={absoluteUrl(`/submissions/${submission.id}`).toString()}
          title="New candidate submission"
        />,
      );

      await transporter.sendMail({
        to: assessment.reviewers.map((r) => r.email), // list of receivers
        subject: `You have a new candidate submission`, // Subject line
        html: html, // html body
      });
    }

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
