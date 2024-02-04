"use server";

import type {
  Candidate,
  Organization,
  Prisma,
  User,
  UserType,
} from "@prisma/client";
import { redirect } from "next/navigation";
import {
  CandidateCreateInputSchema,
  OrganizationCreateInputSchema,
  UserSchema,
} from "prisma/zod";
import slugify from "slugify";
import { z } from "zod";

import { createCustomer } from "~/ee/lib/core";
import { env } from "~/env.mjs";
import { getServerSession } from "~/server/auth";
import { createError, ERROR_CODES } from "~/server/error";
import { create as createCandidate } from "~/server/services/Candidates";
import * as orgService from "~/server/services/Organizations";
import { update as updateUser } from "~/server/services/User";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type UpdateUserTypeAction = (data: {
  type: UserType;
}) => Promise<ActionResponse<User>>;

export const updateUserTypeAction: UpdateUserTypeAction = async (data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    UserSchema.pick({ type: true }).parse(data);

    const dbUser = await updateUser({ id: user.id }, data);
    return { success: true, data: dbUser };
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
export type CreateCandidateAction = (
  data: Prisma.CandidateCreateInput,
) => Promise<ActionResponse<Candidate>>;

export const createCandidateAction: CreateCandidateAction = async (data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    data = CandidateCreateInputSchema.parse({
      ...data,
      user: { connect: { id: user.id } },
      email: user.email,
    });

    const candidate = await createCandidate(data);

    await updateUser(
      { id: user.id },
      { name: `${data.name} ${data.lastName}`, completedOnboarding: true },
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

    return { success: false, error: { message: "something went wrong" } };
  }
};

export type CreateOrgAction = (
  data: Pick<Prisma.OrganizationCreateInput, "name">,
) => Promise<ActionResponse<Organization>>;

export const createOrgAction: CreateOrgAction = async (data) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  if (user.activeOrgId) {
    return {
      success: false,
      error: createError("The user already has an organization"),
    };
  }

  try {
    const createDto = OrganizationCreateInputSchema.parse({
      ...data,
      slug: slugify(data.name),
    });

    const org = await orgService.create(createDto, user);

    if (env.IS_EE) {
      await createCustomer(org);
    }

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
