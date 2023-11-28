"use server";

import { type Candidate, type Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { createError, ERROR_CODES } from "~/server/error";
import { update as updateCandidate } from "~/server/repositories/Candidates";
import type { ActionResponse } from "~/types";

export type UpdateCandidateAction = (
  candidateId: string,
  data: Prisma.CandidateUpdateInput,
) => Promise<ActionResponse<Candidate>>;
export const updateCandidateAction: UpdateCandidateAction = async (
  candidateId,
  data,
) => {
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

    return { success: true, data: candidate };
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

    return { success: false, error: createError() };
  }
};
