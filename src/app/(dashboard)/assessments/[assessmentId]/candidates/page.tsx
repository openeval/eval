import { Users } from "lucide-react";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import prisma from "~/server/db";
import { type Candidate } from "@prisma/client";
import { CandidateItem } from "~/components/CandidateItem";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";

const getCandidates = async (
  assessmentId: string
): Promise<Candidate[] | null> => {
  const data = await prisma.assessment.findFirst({
    where: {
      id: assessmentId,
    },
    include: { candidates: true },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return data ? data.candidates : null;
};

type AssessmentCandidatePageProps = {
  params: { assessmentId: string };
};

export default async function AssessmentCandidatePage({
  params,
}: AssessmentCandidatePageProps) {
  const candidates = await getCandidates(params.assessmentId);
  return (
    <>
      <div className="mb-8 flex justify-between px-2">
        <div className="grid gap-1">
          <p className="text-neutral-500">
            Invite and follow candidates progress
          </p>
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
          <EmptyPlaceholder.Title> No candidates yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by inviting candidates to the assessment.
          </EmptyPlaceholder.Description>
          <InviteCandidateButton assessmentId={params.assessmentId} />
        </EmptyPlaceholder>
      )}
    </>
  );
}
