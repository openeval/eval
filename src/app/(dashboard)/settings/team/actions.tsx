"use server";

import {
  UserType,
  type Membership,
  type MembershipRole,
  type User,
} from "@prisma/client";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { TeamMateInvitationEmail } from "~/emails/TeamMateInvitationEmail";
import { generateAuthLink, getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { ERROR_CODES, ErrorResponse, ServiceError } from "~/server/error";
import { transporter } from "~/server/mailer";
import * as MembershipService from "~/server/services/Membership";
import * as OrgService from "~/server/services/Organizations";
import * as UserService from "~/server/services/User";
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
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgService.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const member = await prisma.user.upsert({
      where: { email: data.email, type: UserType.RECRUITER },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        type: UserType.RECRUITER,
        completedOnboarding: true,
      },
    });

    if (member.type === UserType.APPLICANT) {
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
      const inviteLink = await generateAuthLink(data.email, {
        callbackUrl: `/onboarding/recruiter/invited?membershipId=${membership.id}`,
      });

      const html = render(
        <TeamMateInvitationEmail
          username={data.name}
          teamName={org.name}
          inviteLink={inviteLink}
        />,
      );

      await transporter.sendMail({
        to: data.email, // list of receivers
        subject: `${org.name} invited you to join the team`, // Subject line
        html: html, // html body
      });
    }

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: member };
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

export type RemoveMembershipAction = (
  id: string,
) => Promise<ActionResponse<{ message: string }>>;

export const removeMembershipAction: RemoveMembershipAction = async (id) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgService.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const memership = await MembershipService.findOneById(id);

    if (!memership) {
      throw Error("membership not found");
    }

    if (memership?.organizationId !== org.id) {
      throw Error("forbidden");
    }

    if (memership.userId === user.id) {
      throw Error("You can't remove yourself from the org");
    }

    await MembershipService.remove(id);

    // TODO: active orgs should be part of user sessions
    await UserService.update(
      { id: memership.userId },
      { activeOrg: { disconnect: true } },
    );

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: { message: "removed" } };
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

export type UpdateMembershipRoleAction = (
  id: string,
  role: MembershipRole,
) => Promise<ActionResponse<Membership>>;

export const updateMembershipRoleAction: UpdateMembershipRoleAction = async (
  id,
  role,
) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const org = await OrgService.findOneById(user.activeOrgId);

    if (!org) {
      throw Error("organization not found");
    }

    const memership = await MembershipService.findOneById(id);

    if (!memership) {
      throw Error("membership not found");
    }

    if (memership?.organizationId !== org.id) {
      throw Error("forbidden");
    }

    if (memership.userId === user.id) {
      throw Error("You can't remove yourself from the org");
    }

    const res = await MembershipService.update({ id }, { role });

    // this refresh the data from the form
    revalidatePath("/settings/team");
    return { success: true, data: res };
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
