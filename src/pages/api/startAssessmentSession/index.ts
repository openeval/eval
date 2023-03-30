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
    const startAssessmentSchema = z.object({
      assessmentId: z.string(),
    });

    try {
      data = startAssessmentSchema.parse({
        ...req.body,
      });

      const candidate = await prisma.candidate.findFirst({
        where: {
          email: user.email as string,
        },
      });

      response = await prisma.assessmentSession.create({
        data: {
          assessment: { connect: { id: data.assessmentId } },
          sessionToken: "TODO_SESSION_TOKEN",
          expiresAt: new Date(),
          //TODO: add more conditions , like matching org candidate etc
          candidate: {
            connect: { id: candidate.id },
          },
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

  // TODO: handle the update of a session, what are the cases  ?
  if (req.method === "PUT") {
    try {
      data = AssessmentUpdateInputSchema.parse(req.body);

      response = await prisma.assessment.update({
        where: { id: data.id as string },
        data,
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res.status(404).json({ message: "Entity not found" });
      }
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(500).end();
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
