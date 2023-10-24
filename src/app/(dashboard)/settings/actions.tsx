"use server";

import type { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { notFound, redirect } from "next/navigation";
import { OrganizationUpdateInputSchema } from "prisma/zod";
import slugify from "slugify";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import * as orgRepo from "~/server/repositories/Organizations";

export async function updateOrgAction(
  id: string,
  data: Prisma.OrganizationUpdateInput,
) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  let org = await orgRepo.findOneById(id);

  if (!org) {
    notFound();
  }

  if (org?.createdById !== user.id) {
    return { error: "you must be the owner of the org to change it" };
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

    return org;
  } catch (error) {
    // TODO : how to capture errors in server actions (no documented)
    if (error instanceof z.ZodError) {
      return JSON.stringify(error.issues), { status: 422 };
    }

    throw new Error("something went wrong");
  }
}
