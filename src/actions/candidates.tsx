"use server";

import { UserType } from "@prisma/client";
import { render } from "@react-email/render";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";

import {
  InviteCandidateSchema,
  type InviteCandidateType,
} from "~/dto/InviteCandidateDto";
import { AssessmentInvitationEmail } from "~/emails/AssessmentInvitationEmail";
import { generateAuthLink, getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { createError, ERROR_CODES } from "~/server/error";
import { transporter } from "~/server/mailer";
import {
  findInvitedCandidate,
  findOneById,
  remove,
} from "~/server/repositories/Candidates";
import type { ActionResponse } from "~/types";

export type InviteCandidateAction = (
  data: InviteCandidateType,
) => Promise<ActionResponse<{ message: string }>>;

export const inviteCandidateAction: InviteCandidateAction = async (data) => {
  const session = await getServerSession();

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

    const userCandidate = await prisma.user.upsert({
      where: {
        email: data.email,
        type: UserType.CANDIDATE,
      },
      create: {
        email: data.email,
        completedOnboarding: true,
        type: UserType.CANDIDATE,
      },
      update: {},
    });

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
        user: { connect: { id: userCandidate.id } },
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

    const inviteLink = await generateAuthLink(data.email, {
      callbackUrl: `/a/${assessment.id}/${slugify(assessment.title)}`,
    });

    const html = render(
      <AssessmentInvitationEmail
        username={data.name}
        org={"TODO"}
        assessmentName={assessment.title}
        inviteLink={inviteLink}
      />,
    );

    await transporter.sendMail({
      to: data.email, // list of receivers
      subject: `You have a new assessment invitation`, // Subject line
      html: html, // html body
    });

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

type RemoveCandidateAction = (
  candidateId: string,
) => Promise<ActionResponse<{ message: string }>>;

export const removeCandidateAction: RemoveCandidateAction = async (
  candidateId,
) => {
  const session = await getServerSession();

  // users shound't be able to execute an action without a session
  // this is a security prevention
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  try {
    const candidate = await findOneById(candidateId, user.activeOrgId);

    if (!candidate) {
      throw Error("Candidate not found");
    }

    await remove(candidateId);

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
