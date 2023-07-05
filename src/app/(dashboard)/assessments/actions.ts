"use server";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { revalidatePath } from "next/cache";
import {
  CreateAssessmentDto,
  type CreateAssessmentDtoType,
} from "~/dto/CreateAssessmentDto";
import { z } from "zod";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";

import { AssessmentStatus } from "@prisma/client";
import {
  UpdateAssessmentDto,
} from "~/dto/UpdateAssessmentDto";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export async function createAssessment(data: CreateAssessmentDtoType) {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    CreateAssessmentDto.parse({
      ...data,
    });

    const assessment = await prisma.assessment.create({
      data: {
        ...data,
        status: AssessmentStatus.DRAFT,
        published: false,
        organization: { connect: { id: user.activeOrgId as string } },
        createdBy: { connect: { id: user.id } },
      },
    });

    return assessment;
  } catch (error) {
    // TODO : how to capture errors in server actions (no documented)

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    throw new Error("something went wrong");
  }
}

export async function updateAssessment(
  where: Prisma.AssessmentWhereUniqueInput,
  data: Prisma.AssessmentUpdateInput
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  try {
    UpdateAssessmentDto.parse({
      ...data,
    });

    await prisma.assessment.update({
      where: { ...where, createdById: session.user.id },
      data,
    });

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/assessments/[assessmentId]");
  } catch (e) {
    // TODO : how to capture errors in server actions (no documented)
    throw new Error("something went wrong");
  }
}
