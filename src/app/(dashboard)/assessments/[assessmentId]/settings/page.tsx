import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Assessments";
import { findAllMembershipsByOrgId } from "~/server/repositories/Membership";
import { AssessmentSettingsPage } from "./AssessmentSettingsPage";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

export default async function AssessmentDetailPage({
  params: { assessmentId },
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const assessment = await findOneById(assessmentId, user.activeOrgId);
  const members = await findAllMembershipsByOrgId(user.activeOrgId as string);

  if (!assessment) {
    notFound();
  }

  return <AssessmentSettingsPage data={{ assessment, members }} />;
}
