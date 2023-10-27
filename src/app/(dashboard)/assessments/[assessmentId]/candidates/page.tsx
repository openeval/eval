import { Users } from "lucide-react";
import { redirect } from "next/navigation";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";
import { getCurrentUser } from "~/server/auth";
import prisma from "~/server/db";
import { CandidateItem } from "./CandidateItem";

const getCandidates = async (assessmentId: string) => {
  return await prisma.candidatesOnAssessments.findMany({
    select: {
      candidate: {
        include: {
          assessmentSessions: { where: { assessmentId } },
        },
      },
    },
    where: {
      assessmentId: assessmentId,
    },
  });
};

type AssessmentCandidatePageProps = {
  params: { assessmentId: string };
};

export default async function AssessmentCandidatePage({
  params,
}: AssessmentCandidatePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const candidates = await getCandidates(params.assessmentId);
  return (
    <>
      <div className="mb-8 flex justify-between px-2">
        <div className="grid gap-1">
          <p className="text-slate-500">
            Invite and follow candidates progress
          </p>
        </div>
        <InviteCandidateButton assessmentId={params.assessmentId} />
      </div>

      {candidates && candidates.length > 0 && (
        <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
          {candidates.map((item) => (
            <CandidateItem
              key={item.candidate.id}
              candidate={item.candidate}
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
