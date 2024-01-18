"use server";

import { redirect } from "next/navigation";
import { FeedbackSchema } from "prisma/zod";
import { z } from "zod";

import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";

export const sendFeedbackAction = async (data: { message: string }) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    FeedbackSchema.pick({ message: true }).parse(data);

    const feedback = await prisma.feedback.create({
      data: { message: data.message, createdBy: { connect: { id: user.id } } },
    });

    return { success: true, data: feedback };
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
