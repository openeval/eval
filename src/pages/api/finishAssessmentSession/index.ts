import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";

import { z } from "zod";

import { AssessmentUpdateInputSchema } from "prisma/zod";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response, data;

  // TODO: move this to middlewares
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(401).json({ message: "You must be logged in." });

  const { user } = session;

  if (req.method === "POST") {
    const finishAssessmentSchema = z.object({
      sessionId: z.string(),
    });

    try {
      data = finishAssessmentSchema.parse({
        ...req.body,
      });

      const candidate = await prisma.candidate.findFirst({
        where: {
          email: user.email as string,
        },
      });

      response = await prisma.assessmentSession.update({
        where: { id: data.sessionId },
        data: {
          finishedAt: new Date(),
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(500).end();
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}