import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { GitBranch } from "lucide-react";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/Button";
import { cache } from "react";
import prisma from "~/server/db";
import { type User } from "@prisma/client";
import { CandidateItem } from "~/components/CandidateItem";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";
const getAssessment = cache(async (assessmentId: string) => {
  return await prisma.assessment.findMany({
    where: {
      id: assessmentId,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      candidates: true,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
});

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

  const { candidates, other } = await getAssessment(params.assessmentId);
  console.log(other);
  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Candidates
          </h1>
          <p className="text-neutral-500">tests for your candidates</p>
        </div>
        <InviteCandidateButton />
      </div>

      <Separator className="my-4" />

      {candidates && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {candidates.map((candidate) => (
            <CandidateItem key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}

      {!candidates && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No candidates yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by inviting candidates to the assessment.
          </EmptyPlaceholder.Description>
          <InviteCandidateButton />
        </EmptyPlaceholder>
      )}
    </>
  );
}
