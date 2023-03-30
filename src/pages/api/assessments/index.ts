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
    try {
      data = AssessmentCreateInputSchema.parse({
        ...req.body,
        status: "DRAFT",
        published: false,
        organization: { connect: { id: user.activeOrgId } },
        createdBy: { connect: { id: user.id } },
      });

      response = await prisma.assessment.create({
        data,
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
