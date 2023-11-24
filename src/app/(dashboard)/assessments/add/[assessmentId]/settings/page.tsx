import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Assessments";
import { AssessmentSettingsPage } from "./AssessmentSettingsPage";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

export const metadata = {
  title: "New Assessments - settings",
};

export default async function AssessmentDetailPage({
  params: { assessmentId },
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const assessment = await findOneById(assessmentId, user.activeOrgId);
  if (!assessment) {
    notFound();
  }

  return <AssessmentSettingsPage data={{ assessment }} />;
}
