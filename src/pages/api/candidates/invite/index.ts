import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { InviteCandidateSchema } from "~/dto/InviteCandidateDto";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { ApiError, ERROR_CODES } from "~/server/error";
import sendInvitationEmail from "~/server/invite";
import { findInvitedCandidate } from "~/server/repositories/Candidates";

// TODO: move to nextjs actions
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
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
        data.email,
      );

      if (invitedCandidate) {
        throw new ApiError(
          ERROR_CODES.BAD_REQUEST,
          "Candidate already invited",
        );
      }

      const candidate = await prisma.candidate.upsert({
        where: { email: data.email, organizationId: user.activeOrgId },
        update: {},
        create: {
          ...data,
          candidatesOnAssessments: {
            create: { assessmentId: assessmentId },
          },
          organization: { connect: { id: user.activeOrgId || undefined } },
          createdBy: { connect: { id: user.id } },
        },
      });

      response = await prisma.candidatesOnAssessments.upsert({
        where: {
          candidateId_assessmentId: {
            candidateId: candidate.id,
            assessmentId: assessmentId,
          },
        },
        update: {},
        create: { candidateId: candidate.id, assessmentId: assessmentId },
      });

      // TODO: create a better template
      await sendInvitationEmail(data.email, assessment);

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
