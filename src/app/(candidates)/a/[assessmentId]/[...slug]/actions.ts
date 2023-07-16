"use server";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { add } from "date-fns";
import { z } from "zod";
import { redirect } from "next/navigation";
import * as assessmentSessionsRepo from "~/server/repositories/AssessmentSessions";
import * as assessmentsRepo from "~/server/repositories/Assessments";
import * as candidatesRepo from "~/server/repositories/Candidates";
import { AssessmentStatus } from "@prisma/client";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function startAssessmentSessionAction(assessmentId) {
  const session = await getServerSession(authOptions);
  let response;
  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const assessment = await assessmentsRepo.findOneById(assessmentId);

    const candidate = await candidatesRepo.findCandidateByUserId(user.id);
    console.log(candidate);
    // what to do if candidate doesn't exist ?

    const session = await assessmentSessionsRepo.findActiveSession(
      candidate?.id,
      assessmentId,
    );

    if (session) {
      return { error: "candidate already started a session" };
    }

    response = await assessmentSessionsRepo.create({
      assessment: { connect: { id: assessmentId } },
      sessionToken: "TODO_SESSION_TOKEN",
      expiresAt: add(new Date(), { days: assessment.evaluationPeriod || 1 }),
      //TODO: add more conditions , like matching org candidate etc
      candidate: {
        connect: { id: candidate?.id },
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return { error: error.issues };
    }
    return { error: "something went wrong" };
  }
}
