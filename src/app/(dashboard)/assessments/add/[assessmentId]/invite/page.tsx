import { type Candidate } from "@prisma/client";
import { Users } from "lucide-react";
import { notFound } from "next/navigation";
import slugify from "slugify";

import { CandidateItem } from "~/components/CandidateItem";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";
import { CopyButton } from "~/components/ui/CopyButton";
import { absoluteUrl } from "~/lib/utils";
import prisma from "~/server/db";
import { findCandidatesByAssessment } from "~/server/repositories/Candidates";

const getCandidates = async (
  assessmentId: string,
): Promise<Candidate[] | null> => {
  return await findCandidatesByAssessment(assessmentId);
};

type AssessmentCandidatePageProps = {
  params: { assessmentId: string };
};

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export default async function AssessmentCandidatePage({
  params,
}: AssessmentCandidatePageProps) {
  const candidates = await getCandidates(params.assessmentId);
  console.log(candidates);

  const assessment = await fetchAssessment(params.assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <>
      <div className="mb-8 flex justify-between px-2">
        <div className="grid gap-1">
          <p className="text-neutral-500">
            Invite candidates to the assessment
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="mr-2">Public url</div>
            <pre className="flex h-11 items-center justify-between space-x-2 overflow-x-auto rounded-lg border border-slate-100 bg-slate-100 px-2 dark:border-slate-700 dark:bg-black">
              <code className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-50">
                {absoluteUrl("/").toString()}a/{assessment.id}/
                {slugify(assessment.title)}
              </code>
              <CopyButton
                value={`${absoluteUrl("/")}a/${assessment.id}/
              ${slugify(assessment.title)}`}
                className="border-none text-slate-900 hover:bg-transparent dark:text-slate-50"
              />
            </pre>
          </div>
        </div>
        <InviteCandidateButton assessmentId={params.assessmentId} />
      </div>

      {candidates && candidates.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {candidates.map((candidate) => (
            <CandidateItem
              key={candidate.id}
              candidate={candidate}
              assessmentId={params.assessmentId}
            />
          ))}
        </div>
      )}

      {candidates && candidates?.length <= 0 && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={Users} />
          <EmptyPlaceholder.Title> No Candidates yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by inviting candidates to the assessment.
          </EmptyPlaceholder.Description>
          <InviteCandidateButton assessmentId={params.assessmentId} />
        </EmptyPlaceholder>
      )}
    </>
  );
}
