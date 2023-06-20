import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { Prisma, CandidateStatus } from "@prisma/client";
import slugify from "slugify";
import { z } from "zod";
import { transporter } from "~/server/mailer";
import { InviteCandidateSchema } from "~/dto/InviteCandidateDto";
import { absoluteUrl } from "~/lib/utils";

import { ApiError, ERROR_CODES } from "~/server/error";

// TODO: move to nextjs actions
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

      const assessment = await prisma.assessment.findFirstOrThrow({
        where: { id: assessmentId },
      });

      // check if users has active assessment sessions
      const invitation = await prisma.candidate.findFirst({
        where: {
          email: data.email,
          organizationId: user.activeOrgId,
          assessments: {
            some: {
              id: assessmentId,
            },
          },
          status: { notIn: CandidateStatus.PENDING },
        },
      });

      if (invitation) {
        throw new ApiError(
          ERROR_CODES.BAD_REQUEST,
          "Candidate already invited"
        );
      }

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

      // TODO: create a better template
      await transporter.sendMail({
        to: response.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "You have a new invitation to an assessment", // plain text body
        html: `<b>Hello ${data.name},</b>
        <br/>
        <br/>
        Please click in the link below to start your assessment <br/> 
        ${absoluteUrl("/")}a/${assessment.id}/${slugify(assessment.title)}`, // html body
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      if (error instanceof ApiError) {
        return res
          .status(error.statusCode)
          .json({ code: error.statusCode, message: error.message });
      }
      return res.status(500).end();
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
