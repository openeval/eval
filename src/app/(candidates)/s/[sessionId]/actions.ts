"use server";

import type { components } from "@octokit/openapi-types";
import { AssessmentSessionStatus } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import * as assessmentSessionsRepo from "~/server/repositories/AssessmentSessions";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function finishAssessmentSessionAction(
  sessionId: string,
  contribution: components["schemas"]["issue-search-result-item"],
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const assessmentSession = await assessmentSessionsRepo.findOneByCandidate(
    sessionId,
    user.candidate?.id,
  );

  if (!assessmentSession) {
    notFound();
  }

  try {
    if (assessmentSession.status !== AssessmentSessionStatus.STARTED) {
      throw new Error("Invalid session");
    }

    const candidate = user.candidate;

    if (!candidate) {
      throw new Error("candidate do not exist");
    }

    const response = await prisma.assessmentSession.update({
      where: { id: sessionId },
      data: {
        finishedAt: new Date(),
        status: AssessmentSessionStatus.FINISHED,
        Submission: {
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
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues };
    }
    return { error: "something went wrong" };
  }
}
