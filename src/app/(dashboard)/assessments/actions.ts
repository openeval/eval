"use server";

import { type Assessment, type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  CreateAssessmentDtoSchema,
  type CreateAssessmentInputDto,
} from "~/dto/CreateAssessmentDto";
import { UpdateAssessmentDto } from "~/dto/UpdateAssessmentDto";
import { getCurrentUser, isAuthorized } from "~/server/auth";
import { ERROR_CODES, ErrorResponse, ServiceError } from "~/server/error";
import * as assessmentService from "~/server/services/Assessments";
import type { ActionResponse } from "~/types";

export type CreateAssessmentAction = (
  input: CreateAssessmentInputDto,
) => Promise<ActionResponse<Assessment>>;

export const createAssessmentAction: CreateAssessmentAction = async (input) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  try {
    if (!isAuthorized(user, "create", "Assessment")) {
      throw new ServiceError("Forbidden");
    }

    const data = CreateAssessmentDtoSchema.parse({
      ...input,
      organizationId: user?.activeOrgId,
      createdById: user?.id,
    });

    const assessment = await assessmentService.create(data);

    return { success: true, data: assessment };
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

export type UpdateAssessmentAction = (
  where: Prisma.AssessmentWhereUniqueInput,
  data: Prisma.AssessmentUpdateInput & { reviewers?: { id: string }[] },
) => Promise<ActionResponse<Assessment>>;

export const updateAssessmentAction: UpdateAssessmentAction = async (
  where,
  data,
) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  try {
    if (!isAuthorized(user, "update", "Assessment")) {
      throw new ServiceError("Forbidden");
    }

    UpdateAssessmentDto.parse({
      ...data,
    });

    const assessment = await assessmentService.update(where, data);

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/assessments/[assessmentId]", "layout");
    return { success: true, data: assessment };
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
