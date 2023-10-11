"use server";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { redirect, notFound } from "next/navigation";
import * as assessmentSessionsRepo from "~/server/repositories/AssessmentSessions";
import { prisma } from "~/server/db";
import { AssessmentSessionStatus } from "@prisma/client";
import { searchContributions } from "~/server/github";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function finishAssessmentSessionAction(sessionId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const assessmentSession = await assessmentSessionsRepo.findOneById(sessionId);

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

    const ghContributions = await searchContributions(
      candidate.ghUsername as string,
      assessmentSession.assessment.ghIssuesQuerySeach as string,
    );

    const contributions = await prisma.$transaction(
      ghContributions.map((pr) => {
        return prisma.contribution.create({
          data: {
            title: pr.title,
            description: pr.body,
            url: pr.html_url,
            repo: pr.repository_url, //TODO: repo name or url ?
            state: pr.state,
            contributorId: candidate.id,
            meta: pr, //save gh object
          },
        });
      }),
    );

    const response = await prisma.$transaction([
      prisma.assessmentSession.update({
        where: { id: sessionId },
        data: {
          finishedAt: new Date(),
          status: AssessmentSessionStatus.FINISHED,
        },
      }),
      prisma.submission.create({
        data: {
          assessmentSessionId: sessionId,
          candidateId: candidate.id,
          assessmentId: assessmentSession.assessment.id,
          contributions: {
            connect: contributions.map((c) => {
              return { id: c.id };
            }),
          },
        },
      }),
    ]);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues };
    }
    return { error: "something went wrong" };
  }
}
