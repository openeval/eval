"use server";

import { AssessmentStatus, CandidateStatus } from "@prisma/client";
import { add } from "date-fns";
import { getServerSession } from "next-auth/next";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { absoluteUrl } from "~/lib/utils";
import { authOptions } from "~/server/auth";
import * as assessmentsRepo from "~/server/repositories/Assessments";
import * as assessmentSessionsRepo from "~/server/repositories/AssessmentSessions";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function startAssessmentSessionAction(assessmentId) {
  const session = await getServerSession(authOptions);
  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  const { candidate } = user;
  if (!candidate || candidate.status !== CandidateStatus.VERIFIED) {
    redirect(`/onboarding?callbackUrl=${absoluteUrl() + "a/" + assessmentId}`);
  }

  const assessment = await assessmentsRepo.findOneById(assessmentId);

  if (!assessment) {
    notFound();
  }

  try {
    if (assessment.status !== AssessmentStatus.ACTIVE) {
      throw new Error("Invalid assessment");
    }

    const session = await assessmentSessionsRepo.findActiveSession(
      candidate?.id,
      assessmentId,
    );

    if (session) {
      return { error: "candidate already started a session" };
    }

    const response = await assessmentSessionsRepo.create({
      assessment: { connect: { id: assessmentId } },
      sessionToken: "TODO_SESSION_TOKEN" + new Date().toString(),
      expiresAt: add(new Date(), {
        days: Number(assessment.evaluationPeriodDays) || 1,
      }),
      //TODO: add more conditions , like matching org candidate etc
      candidate: {
        connect: { id: candidate?.id },
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
