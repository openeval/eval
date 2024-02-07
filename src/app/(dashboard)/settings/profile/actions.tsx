"use server";
"use only-server";

import type { Prisma, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { UserUpdateInputSchema } from "prisma/zod";
import { z } from "zod";

import { getServerSession } from "~/server/auth";
import { ERROR_CODES, ErrorResponse } from "~/server/error";
import * as userService from "~/server/services/User";
import type { ActionResponse } from "~/types";

export type UpdateProfileAction = (
  id: User["id"],
  data: Prisma.UserUpdateInput,
) => Promise<ActionResponse<User>>;

export const updateProfileAction: UpdateProfileAction = async (id, data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  let uUser = await userService.findOneById(id);

  if (!uUser || uUser?.id !== user.id) {
    notFound();
  }

  try {
    UserUpdateInputSchema.parse(data);
    uUser = await userService.update(
      { id },
      {
        ...data,
      },
    );

    return { success: true, data: uUser };
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
