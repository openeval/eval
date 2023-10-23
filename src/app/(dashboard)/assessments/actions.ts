"use server";

import { AssessmentStatus, type Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  CreateAssessmentDto,
  type CreateAssessmentDtoType,
} from "~/dto/CreateAssessmentDto";
import { UpdateAssessmentDto } from "~/dto/UpdateAssessmentDto";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";

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
  } catch (e) {
    console.log(e);
    if (e instanceof z.ZodError) {
      return JSON.stringify(e.issues);
    }

    throw new Error("something went wrong");
  }
}

export async function updateAssessment(
  where: Prisma.AssessmentWhereUniqueInput,
  data: Prisma.AssessmentUpdateInput,
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
      where: { ...where },
      data,
    });

    //revalidate uses string paths rather than string literals like "`/assessments/${id}`"
    // this refresh the data from the form
    revalidatePath("/assessments/[assessmentId]");
  } catch (e) {
    console.log(e);
    if (e instanceof z.ZodError) {
      return JSON.stringify(e.issues);
    }
    // TODO : how to capture errors in server actions (no documented)
    throw new Error("something went wrong");
  }
}
