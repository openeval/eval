"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  InviteCandidateSchema,
  type InviteCandidateType,
} from "~/dto/InviteCandidateDto";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { ERROR_CODES, ErrorResponse, ServiceError } from "~/server/error";
import { findOneById, remove } from "~/server/services/Candidates";
import * as candidatesService from "~/server/services/Candidates";
import type { ActionResponse } from "~/types";

export type InviteCandidateAction = (
  data: InviteCandidateType,
) => Promise<ActionResponse<{ message: string }>>;

export const inviteCandidateAction: InviteCandidateAction = async (data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    InviteCandidateSchema.parse(data);

    const { assessmentId, ...invitedData } = data;

    const assessment = await prisma.assessment.findFirstOrThrow({
      where: { id: assessmentId },
    });

    await candidatesService.inviteToAssessment(assessment, {
      ...invitedData,
      fromOrganization: user.activeOrg,
      byUser: user,
    });

    return { success: true, data: { message: "ok" } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ErrorResponse(
        "Incorrect format",
        ERROR_CODES.BAD_REQUEST,
        error.issues,
      );
    }

    if (error instanceof ServiceError) {
      return ErrorResponse(error.message);
    }

    return ErrorResponse();
  }
};

type RemoveCandidateAction = (
  candidateId: string,
) => Promise<ActionResponse<{ message: string }>>;

export const removeCandidateAction: RemoveCandidateAction = async (
  candidateId,
) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const candidate = await findOneById(candidateId, user.activeOrgId);

    if (!candidate) {
      throw Error("Candidate not found");
    }

    await remove(candidateId);

    return { success: true, data: { message: "ok" } };
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
};
