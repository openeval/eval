"use server";

import type {
  Candidate,
  Organization,
  Prisma,
  User,
  UserType,
} from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import {
  CandidateCreateInputSchema,
  OrganizationCreateInputSchema,
  UserUpdateInputSchema,
} from "prisma/zod";
import slugify from "slugify";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import { create as createCandidate } from "~/server/repositories/Candidates";
import * as orgRepo from "~/server/repositories/Organizations";
import { update as updateUser } from "~/server/repositories/User";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type UpdateUserTypeAction = (
  data: UserType,
) => Promise<ActionResponse<User>>;

export const updateUserTypeAction: UpdateUserTypeAction = async (data) => {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    UserUpdateInputSchema.pick({ type: true }).parse(data);

    const upUser = await updateUser({ id: user.id }, data);
    return { success: true, data: upUser };
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
  const session = await getServerSession(authOptions);

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
  const session = await getServerSession(authOptions);

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

    const org = await orgRepo.create(createDto, user);

    if (org) {
      // set active org to current created
      await prisma.user.update({
        where: { id: user.id },
        data: { activeOrgId: org.id, completedOnboarding: true },
      });
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
