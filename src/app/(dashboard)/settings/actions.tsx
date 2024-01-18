"use server";
"use only-server";

import type { Organization, Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { OrganizationUpdateInputSchema } from "prisma/zod";
import slugify from "slugify";
import { z } from "zod";

import { getServerSession } from "~/server/auth";
import { createError, ERROR_CODES } from "~/server/error";
import * as orgRepo from "~/server/repositories/Organizations";
import type { ActionResponse } from "~/types";

export type UpdateOrgAction = (
  id: Organization["id"],
  data: Prisma.OrganizationUpdateInput,
) => Promise<ActionResponse<Organization>>;

export const updateOrgAction: UpdateOrgAction = async (id, data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  let org = await orgRepo.findOneById(id);

  if (!org || org?.id !== user.activeOrgId) {
    notFound();
  }

  try {
    OrganizationUpdateInputSchema.parse(data);
    org = await orgRepo.update(
      { id },
      {
        ...data,
        slug: slugify(data.name as string),
      },
    );

    return { success: true, data: org };
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
