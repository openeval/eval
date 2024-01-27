"use server";

import { AssessmentStatus, type Assessment, type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  CreateAssessmentDto,
  type CreateAssessmentDtoType,
} from "~/dto/CreateAssessmentDto";
import { UpdateAssessmentDto } from "~/dto/UpdateAssessmentDto";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import * as assessmentRepo from "~/server/repositories/Assessments";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type CreateAssessmentAction = (
  data: CreateAssessmentDtoType,
) => Promise<ActionResponse<Assessment>>;

export const createAssessmentAction: CreateAssessmentAction = async (data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  try {
    CreateAssessmentDto.parse({
      ...data,
    });

    const assessment = await prisma.assessment.create({
      data: {
        ...data,
        status: AssessmentStatus.ACTIVE,
        published: false,
        organization: { connect: { id: user.activeOrgId as string } },
        createdBy: { connect: { id: user.id } },
      },
    });

    return { success: true, data: assessment };
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

export type UpdateAssessmentAction = (
  where: Prisma.AssessmentWhereUniqueInput,
  data: Prisma.AssessmentUpdateInput & { reviewers?: { id: string }[] },
) => Promise<ActionResponse<Assessment>>;

export const updateAssessmentAction: UpdateAssessmentAction = async (
  where,
  data,
) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  try {
    UpdateAssessmentDto.parse({
      ...data,
    });

    const assessment = await assessmentRepo.update(where, data);

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/assessments/[assessmentId]");
    return { success: true, data: assessment };
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
