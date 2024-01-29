import { Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { InviteCandidateButton } from "~/components/InviteCandidateButton";
import { Typography } from "~/components/ui/Typography";
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
