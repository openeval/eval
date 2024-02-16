"use server";

import "server-only";

import { subject } from "@casl/ability";
import type { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { ProfileDtoSchema, type ProfileDto } from "~/dto/ProfileDto";
import { getCurrentUser, isAuthorized } from "~/server/auth";
import { ERROR_CODES, ErrorResponse, ServiceError } from "~/server/error";
import * as userService from "~/server/services/User";
import type { ActionResponse } from "~/types";

export type UpdateProfileAction = (
  id: User["id"],
  data: ProfileDto,
) => Promise<ActionResponse<User>>;

export const updateProfileAction: UpdateProfileAction = async (id, data) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  let profile = await userService.findOneById(id);

  if (!profile) {
    notFound();
  }

  try {
    if (!isAuthorized(user, "update", subject("Profile", profile))) {
      throw new ServiceError("Forbidden");
    }

    ProfileDtoSchema.parse(data);

    profile = await userService.update(
      { id },
      {
        ...data,
      },
    );

    revalidatePath("/settings/profile");

    return { success: true, data: profile };
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
