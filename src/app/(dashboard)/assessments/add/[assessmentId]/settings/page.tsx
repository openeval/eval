import { notFound } from "next/navigation";

import { prisma } from "~/server/db";
import { updateAssessmentAction } from "../../../actions";
import { AssessmentSettingsForm } from "./AssessmentSettingsForm";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export const metadata = {
  title: "New Assessments - settings",
};

export default async function AssessmentDetailPage({
  params: { assessmentId },
}: AssessmentDetailPageProps) {
  const assessment = await fetchAssessment(assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <AssessmentSettingsForm
        assessment={assessment}
        action={updateAssessmentAction}
      />
    </div>
  );
}
