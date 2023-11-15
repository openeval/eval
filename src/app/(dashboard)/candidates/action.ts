"use server";

import { type Candidate } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { update as updateCandidate } from "~/server/repositories/Candidates";

// TODO: update types
export async function updateCandidateAction(
  candidateId,
  data,
): Promise<Candidate | null> {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const candidate = await updateCandidate(
      { id: candidateId, organizationId: user.activeOrgId },
      data,
    );

    return candidate;
  } catch (error) {
    // TODO : how to capture errors in server actions (no documented)
    if (error instanceof z.ZodError) {
      //   return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    throw new Error("something went wrong");
  }
}
