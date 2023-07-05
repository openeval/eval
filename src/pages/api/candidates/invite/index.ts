import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import { z } from "zod";
import { InviteCandidateSchema } from "~/dto/InviteCandidateDto";
import { findInvitedCandidate } from "~/server/repositories/Candidates";
import { ApiError, ERROR_CODES } from "~/server/error";
import sendInvitationEmail from "~/server/invite";

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
      const invitedCandidate = await findInvitedCandidate(
        user,
        assessmentId,
        data.email
      );

      if (invitedCandidate) {
        throw new ApiError(
          ERROR_CODES.BAD_REQUEST,
          "Candidate already invited"
        );
      }

      response = await prisma.candidate.upsert({
        where: { email: data.email, organizationId: user.activeOrgId },
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
      await sendInvitationEmail("idhard@gmail.com", assessment);

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
