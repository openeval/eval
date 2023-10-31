"use server";

import {
  UserType,
  type Membership,
  type MembershipRole,
  type User,
} from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { FlowTypes } from "~/config/flows";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import sendInvitationEmail from "~/server/invite";
import * as MembershipRepo from "~/server/repositories/Membership";
import * as OrgRepo from "~/server/repositories/Organizations";
import * as UserRepo from "~/server/repositories/User";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type InviteTeamMemberAction = (data: {
  email: string;
  role: MembershipRole;
  name?: string;
}) => Promise<ActionResponse<User>>;

export const inviteTeamMemberAction: InviteTeamMemberAction = async (data) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgRepo.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const member = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: { email: data.email, type: UserType.RECRUITER },
    });

    if (member.type === UserType.CANDIDATE) {
      throw Error("User unavailable");
    }

    const membership = await prisma.membership.upsert({
      where: {
        userId_organizationId: { userId: member.id, organizationId: org.id },
      },
      update: {},
      create: {
        userId: member.id,
        role: data.role,
        organizationId: org.id,
      },
    });

    if (!membership.accepted) {
      const emailSettings = {
        toEmail: data.email,
        subject: `${org.name} invited you to join its team`,
        emailTemplate: "MEMBERSHIP_INVITATION",
        callbackUrl: `/`,
        urlSearchParams: {
          organizationId: user.activeOrgId,
          flow: FlowTypes.TEAM_MEMEBER_INVITED,
        },
      };

      await sendInvitationEmail(emailSettings);
    }

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: member };
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

    return { success: false, error: createError(error?.message) };
  }
};

export type RemoveMembershipAction = (
  id: string,
) => Promise<ActionResponse<{ message: string }>>;

export const removeMembershipAction: RemoveMembershipAction = async (id) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgRepo.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const memership = await MembershipRepo.findOneById(id);

    if (!memership) {
      throw Error("membership not found");
    }

    if (memership?.organizationId !== org.id) {
      throw Error("forbidden");
    }

    if (memership.userId === user.id) {
      throw Error("You can't remove yourself from the org");
    }

    await MembershipRepo.remove(id);

    // TODO: active orgs should be part of user sessions
    await UserRepo.update(
      { id: memership.userId },
      { activeOrg: { disconnect: true } },
    );

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: { message: "removed" } };
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

    return { success: false, error: createError(error?.message) };
  }
};

export type UpdateMembershipRoleAction = (
  id: string,
  role: MembershipRole,
) => Promise<ActionResponse<Membership>>;

export const updateMembershipRoleAction: UpdateMembershipRoleAction = async (
  id,
  role,
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgRepo.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const memership = await MembershipRepo.findOneById(id);

    if (!memership) {
      throw Error("membership not found");
    }

    if (memership?.organizationId !== org.id) {
      throw Error("forbidden");
    }

    if (memership.userId === user.id) {
      throw Error("You can't remove yourself from the org");
    }

    const res = await MembershipRepo.update({ id }, { role });

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: res };
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

    return { success: false, error: createError(error?.message) };
  }
};
