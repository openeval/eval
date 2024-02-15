import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findOneById } from "~/server/services/Assessments";
import { findAllMembershipsByOrgId } from "~/server/services/Membership";
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

  if (!isAuthorized(user, "read", "Assessment")) {
    redirect("/404");
  }

  const assessment = await findOneById(assessmentId, user.activeOrgId);
  const members = await findAllMembershipsByOrgId(user.activeOrgId as string);

  if (!assessment) {
    notFound();
  }

  return <AssessmentSettingsPage data={{ assessment, members }} />;
}
