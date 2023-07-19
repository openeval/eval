import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";

import { SubmissionItem } from "./SubmissionItem";
import * as submissionRepo from "~/server/repositories/Submissions";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { GitMerge } from "lucide-react";
export default async function SubmissionsPage({
  params: { assessmentId },
}: {
  params: { assessmentId: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const submissions = await submissionRepo.findByAssessmentId(assessmentId);
  return (
    <div>
      {submissions && submissions.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {submissions.map((item) => (
            <SubmissionItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {submissions && submissions?.length <= 0 && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitMerge} />
          <EmptyPlaceholder.Title> No submissions yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by inviting candidates to the assessment.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </div>
  );
}
