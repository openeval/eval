"use server";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { redirect } from "next/navigation";
import { update as updateUser } from "~/server/repositories/User";
import { create as createCandidate } from "~/server/repositories/Candidates";
import { type Prisma, MembershipRole } from "@prisma/client";
import { prisma } from "~/server/db";
import slugify from "slugify";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function updateUserType(data) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    await updateUser({ id: user.id }, data);
    return { message: "ok" };
  } catch (error) {
    // TODO : how to capture errors in server actions (no documented)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    throw new Error("something went wrong");
  }
}

export async function createCandidateAction(data) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const candidate = { ...data, userId: user.id, email: user.email };
    await createCandidate(candidate);

    await updateUser(
      { id: user.id },
      { name: `${data.name} ${data.lastName}`, completedOnboarding: true },
    );

    return { message: "ok" };
  } catch (error) {
    // TODO : how to capture errors in server actions (no documented)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    throw new Error("something went wrong");
  }
}

export async function createOrgAction(data: Prisma.OrganizationCreateInput) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    // TODO: add validations
    const org = await prisma.organization.create({
      data: {
        ...data,
        slug: slugify(data.name),
        createdBy: { connect: { id: user.id } },
        members: {
          create: {
            userId: user.id,
            role: MembershipRole.OWNER,
            accepted: true,
          },
        },
      },
    });

    if (org) {
      // set active org to current created
      await prisma.user.update({
        where: { id: user.id },
        data: { activeOrgId: org.id, completedOnboarding: true },
      });
    }

    return { message: "ok" };
  } catch (error) {
    console.log(error);
    // TODO : how to capture errors in server actions (no documented)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    throw new Error("something went wrong");
  }
}
