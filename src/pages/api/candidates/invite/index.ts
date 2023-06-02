import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { z } from "zod";
import { transporter } from "~/server/mailer";
import { InviteCandidateSchema } from "~/dto/InviteCandidateDto";
import {
  AssessmentCreateInputSchema,
  AssessmentUpdateInputSchema,
  CandidateCreateInputSchema,
} from "prisma/zod";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response, body;

  // TODO: move this to middlewares
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(401).json({ message: "You must be logged in." });

  const { user } = session;

  if (req.method === "POST") {
    try {
      body = InviteCandidateSchema.parse({
        ...req.body,
      });

      const { assessmentId, ...data } = body;

      response = await prisma.candidate.upsert({
        where: { email: data.email },
        update: {
          // we make sure if the candidate exist to invite it to the assessment
          assessments: { connect: { id: assessmentId } },
        },
        create: {
          ...data,
          assessments: { connect: { id: assessmentId } },
          organization: { connect: { id: user.activeOrgId || undefined } },
          createdBy: { connect: { id: user.id } },
        },
      });

      // await transporter.sendMail({
      //   to: response.email, // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "You have a new invitation to an assessment", // plain text body
      //   html: "<b>Hello world?</b>", // html body
      // });

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
