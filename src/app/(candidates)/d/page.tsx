import { GitBranch } from "lucide-react";
import { redirect } from "next/navigation";
import { cache } from "react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { Separator } from "~/components/ui/Separator";
import { getCurrentUser } from "~/server/auth";
import { findAllForForCandidateList } from "~/server/repositories/Assessments";
import { AssessmentItem } from "./AssessmentItem";

export const metadata = {
  title: "Assessments",
};

const getAssessments = cache(async (candidateId: string) => {
  return await findAllForForCandidateList(candidateId);
});

// Candidates assessesment dashboard
export default async function AssessmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { candidate } = user;

  if (!candidate) {
    redirect("/onboarding/candidate");
  }

  const rows = await getAssessments(candidate.id);

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Assessments
          </h1>
        </div>
      </div>

      <Separator className="my-4" />

      {rows.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {rows.map((row, key) => (
            <AssessmentItem key={key} data={row} />
          ))}
        </div>
      )}

      {!rows.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title>
            {" "}
            You have no assessments yet
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Your invitations will appear here.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </>
  );
}
