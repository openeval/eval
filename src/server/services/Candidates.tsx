import "server-only";

import {
  CandidateOnAssessmentStatus,
  CandidateStatus,
  UserType,
  type Assessment,
  type Organization,
  type Prisma,
} from "@prisma/client";
import { render } from "@react-email/render";
import type { User } from "next-auth";
import slugify from "slugify";

import { siteConfig } from "~/config/site";
import { AssessmentInvitationEmail } from "~/emails/AssessmentInvitationEmail";
import { generateAuthLink } from "~/server/auth";
import { prisma } from "~/server/db";
import { ServiceError } from "~/server/error";
import { transporter } from "~/server/mailer";
import * as userService from "~/server/services/User";

export async function update(
  where: Prisma.CandidateWhereUniqueInput,
  data: Prisma.CandidateUpdateInput,
) {
  return await prisma.candidate.update({ where, data });
}

export async function create(data: Prisma.CandidateCreateInput) {
  return await prisma.candidate.create({ data });
}

export async function findCandidateByUserId(applicantId, organizationId) {
  return await prisma.candidate.findFirst({
    where: {
      applicantId,
      organizationId,
    },
  });
}
export async function findOneById(id, organizationId?) {
  return await prisma.candidate.findFirst({
    where: { id, organizationId },
  });
}

export type CandidateFullData = Prisma.PromiseReturnType<typeof findByIdFull>;
export async function findByIdFull(id, organizationId?) {
  return await prisma.candidate.findFirst({
    where: {
      id,
      organizationId,
    },
    include: {
      submissions: {
        include: { reviews: true, contribution: true, assessment: true },
      },
    },
  });
}
export type CandidateOnAssessmentItems = Prisma.PromiseReturnType<
  typeof findCandidatesByAssessment
>;
export async function findCandidatesByAssessment(assessmentId) {
  return await prisma.candidatesOnAssessments.findMany({
    include: { candidate: true },
    where: {
      assessmentId: assessmentId,
    },
  });
}

export type CandidatesListData = Prisma.PromiseReturnType<
  typeof findAllForList
>;

export async function findAllForList(
  where: Prisma.CandidateWhereInput,
  opts: { page: number } = { page: 0 },
) {
  const pageIndex = opts.page > 0 ? opts.page - 1 : 0;

  // prisma can't return count when adding pagination
  const [data, count] = await prisma.$transaction([
    prisma.candidate.findMany({
      where,
      select: {
        id: true,
        name: true,
        status: true,
        lastName: true,
        email: true,
        createdAt: true,
        _count: { select: { submissions: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      // pagination
      take: siteConfig.pageListLimit,
      skip: pageIndex,
    }),
    prisma.candidate.count({ where }),
  ]);

  return { data, count };
}

export async function remove(id: string) {
  return await prisma.candidate.delete({
    where: {
      id: id,
    },
  });
}

type InvitationDetails = {
  name: string;
  lastName: string;
  email: string;
  fromOrganization: Organization;
  byUser: User;
};

export async function inviteToAssessment(
  assessment: Assessment,
  opts: InvitationDetails,
) {
  const { fromOrganization: org, byUser: user, ...invitedData } = opts;

  // check if users has active assessment sessions
  const invitedCandidate = await prisma.candidate.findFirst({
    where: {
      email: opts.email,
      organizationId: org.id,
      candidatesOnAssessments: {
        some: {
          assessmentId: assessment.id,
          status: CandidateOnAssessmentStatus.STARTED,
        },
      },
    },
  });

  if (invitedCandidate) {
    throw new ServiceError("Candidate already invited");
  }

  //check if user exist in the platform
  const invalidUser = await prisma.user.findFirst({
    where: { email: opts.email, type: UserType.RECRUITER },
  });

  if (invalidUser) {
    throw new ServiceError("You can't invite recruiters to the assigment");
  }

  // we create the eval user as applicant if it doesn't exist
  // and link the candidate
  const userCandidate = await prisma.user.upsert({
    where: {
      email: opts.email,
      type: UserType.APPLICANT,
    },
    create: {
      name: `${opts.name} ${opts.lastName}`.trim(),
      email: opts.email,
      completedOnboarding: true,
      type: UserType.APPLICANT,
    },
    update: {},
  });

  const candidate = await prisma.candidate.upsert({
    where: {
      email_organizationId: {
        email: opts.email,
        organizationId: org.id,
      },
    },
    create: {
      ...invitedData,
      organization: { connect: { id: org.id } },
      createdBy: { connect: { id: user.id } },
      applicant: { connect: { id: userCandidate.id } },
    },
    update: {},
  });

  await prisma.candidatesOnAssessments.upsert({
    where: {
      candidateId_assessmentId: {
        candidateId: candidate.id,
        assessmentId: assessment.id,
      },
      status: CandidateOnAssessmentStatus.PENDING,
    },
    create: { candidateId: candidate.id, assessmentId: assessment.id },
    update: {},
  });

  // check if users already connected their github account
  const ghAccount = await prisma.account.findFirst({
    where: { userId: userCandidate.id, provider: "github" },
  });

  if (ghAccount) {
    await linkGithubAccount(userCandidate, {
      ghUsername: userCandidate.ghUsername,
    });
  }

  const inviteLink = await generateAuthLink(opts.email, {
    callbackUrl: `/a/${assessment.id}/${slugify(assessment.title)}`,
  });

  const html = render(
    <AssessmentInvitationEmail
      username={opts.name}
      org={org.name}
      assessmentName={assessment.title}
      inviteLink={inviteLink}
    />,
  );

  await transporter.sendMail({
    to: opts.email, // list of receivers
    subject: `You have a new assessment invitation`, // Subject line
    html: html, // html body
  });
}

export async function linkGithubAccount(user, profile) {
  await prisma.candidate.updateMany({
    where: { applicantId: user.id, status: CandidateStatus.PENDING },
    data: {
      status: CandidateStatus.VERIFIED,
      verifiedAt: new Date(),
      ghUsername: profile.ghUsername,
    },
  });

  // is this still need it ?
  await userService.update({ id: user.id }, { completedOnboarding: true });
}
