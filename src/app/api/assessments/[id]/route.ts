import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { z } from "zod";

import {
  AssessmentCreateInputSchema,
  AssessmentUpdateInputSchema,
} from "prisma/zod";

export async function PATCH(req: Request) {
  let response, data;

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { user } = session;

  try {
    data = AssessmentUpdateInputSchema.parse(req.body);

    response = await prisma.assessment.update({
      where: { id: data.id as string },
      data,
    });

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}
