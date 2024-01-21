import { Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";
import { CopyButton } from "~/components/ui/CopyButton";
import { Typography } from "~/components/ui/Typography";
import { absoluteUrl } from "~/lib/utils";
import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Assessments";
import { findCandidatesByAssessment } from "~/server/repositories/Candidates";
import { CandidateOnAssessmentItem } from "./CandidateOnAssessmentItem";

const getCandidates = async (assessmentId: string) => {
  return await findCandidatesByAssessment(assessmentId);
};

type AssessmentCandidatePageProps = {
  params: { assessmentId: string };
};

export default async function AssessmentCandidatePage({
  params: { assessmentId },
}: AssessmentCandidatePageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const assessment = await findOneById(assessmentId, user.activeOrgId);
  if (!assessment) {
    notFound();
  }

  const candidates = await getCandidates(assessmentId);

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="grid gap-1">
          <Typography variant={"muted"}>
            Invite candidates to the assessment
          </Typography>

          <div className="mt-4 flex items-center justify-between">
            <pre className="flex h-11 items-center justify-between space-x-2 overflow-x-auto text-nowrap rounded-lg border border-muted bg-muted px-2 ">
              <code className="font-mono text-sm font-semibold">
                {absoluteUrl("/").toString()}a/{assessment.id}/
                {slugify(assessment.title)}
              </code>
              <CopyButton
                value={`${absoluteUrl("/")}a/${assessment.id}/
              ${slugify(assessment.title)}`}
                className="border-none hover:bg-transparent"
              />
            </pre>
          </div>
        </div>
        <InviteCandidateButton assessmentId={assessmentId} />
      </div>

      {candidates && candidates.length > 0 && (
        <div className="divide divide-y rounded-md border">
          {candidates.map((candidate, key) => (
            <CandidateOnAssessmentItem key={key} item={candidate} />
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
          <InviteCandidateButton assessmentId={assessmentId} />
        </EmptyPlaceholder>
      )}
    </>
  );
}
