import "server-only";

import { AssessmentStatus, type Prisma } from "@prisma/client";

import { siteConfig } from "~/config/site";
import { type CreateAssessmentDto } from "~/dto/CreateAssessmentDto";
import { prisma } from "~/server/db";

export async function findAll() {
  return await prisma.assessment.findMany();
}

export type AssessmentsListData = Prisma.PromiseReturnType<
  typeof findAllForList
>;

export async function findAllForList(
  where: Prisma.AssessmentWhereInput,
  opts: { page: number } = { page: 0 },
) {
  const pageIndex = opts.page > 0 ? opts.page - 1 : 0;

  // prisma can't return count when adding pagination
  const [data, count] = await prisma.$transaction([
    prisma.assessment.findMany({
      where,
      select: {
        _count: {
          select: {
            candidatesOnAssessments: true,
            submissions: true,
          },
        },
        id: true,
        title: true,
        status: true,
        published: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      // pagination
      take: siteConfig.pageListLimit,
      skip: pageIndex,
    }),

    prisma.assessment.count({ where }),
  ]);

  return { data, count };
}

export type AssessmentItemData = Prisma.PromiseReturnType<typeof findOneById>;

export async function findOneById(id, organizationId?) {
  return await prisma.assessment.findFirst({
    include: { reviewers: true },
    where: { id, organizationId },
  });
}

export async function update(where: Prisma.AssessmentWhereUniqueInput, data) {
  return await prisma.assessment.update({
    where,
    data: {
      ...data,
      reviewers: {
        set: [],
        connect: data.reviewers || [],
      },
    },
  });
}

export async function create(input: CreateAssessmentDto) {
  const { createdById, organizationId, ...data } = input;

  const assessment = await prisma.assessment.create({
    data: {
      ...data,
      status: AssessmentStatus.ACTIVE,
      published: false,
      organization: { connect: { id: organizationId } },
      createdBy: { connect: { id: createdById } },
    },
  });

  return assessment;
}

export async function findByCandidate(candidateId) {
  return await prisma.candidatesOnAssessments.findMany({
    include: { assessment: true },
    where: { candidateId: candidateId },
  });
}

export type CandidateAssessmentsFullData = Prisma.PromiseReturnType<
  typeof findAllForForCandidateList
>;

export async function findAllForForCandidateList(applicantId: string) {
  return await prisma.candidatesOnAssessments.findMany({
    include: {
      assessment: {
        include: {
          applicantSessions: {
            where: { candidate: { applicantId: applicantId } },
          },
        },
      },
    },
    where: { candidate: { applicant: { id: applicantId } } },
  });
}

export async function updateCandidateAssessmentStatus(
  assessmentId,
  candidateId,
  status,
) {
  return await prisma.candidatesOnAssessments.update({
    data: { status: status },
    where: {
      candidateId_assessmentId: { candidateId: candidateId, assessmentId },
    },
  });
}
