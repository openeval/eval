"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";

import { FlowTypes } from "~/config/flows";
import { InviteCandidateSchema } from "~/dto/InviteCandidateDto";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import sendInvitationEmail from "~/server/invite";
import { findInvitedCandidate } from "~/server/repositories/Candidates";

export const inviteCandidateAction = async (data) => {
  const session = await getServerSession(authOptions);

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    InviteCandidateSchema.parse(data);

    const { assessmentId, ...invitedData } = data;

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
      throw Error("Candidate already invited");
    }

    const candidate = await prisma.candidate.upsert({
      where: { email: data.email, organizationId: user.activeOrgId },
      update: {},
      create: {
        ...invitedData,
        candidatesOnAssessments: {
          create: { assessmentId: assessmentId },
        },
        organization: { connect: { id: user.activeOrgId || undefined } },
        createdBy: { connect: { id: user.id } },
      },
    });

    await prisma.candidatesOnAssessments.upsert({
      where: {
        candidateId_assessmentId: {
          candidateId: candidate.id,
          assessmentId: assessmentId,
        },
      },
      update: {},
      create: { candidateId: candidate.id, assessmentId: assessmentId },
    });

    const emailSettings = {
      toEmail: data.email,
      subject: "You have a new assessment invitation",
      emailTemplate: "ASSESSMENT_INVITATION",
      callbackUrl: `/a/${assessment.id}/${slugify(assessment.title)}`,
      urlSearchParams: {
        flow: FlowTypes.CANDIDATE_INVITED,
        assessmentId: assessment.id,
      },
    };

    await sendInvitationEmail(emailSettings);
    return { success: true, data: { message: "ok" } };
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
