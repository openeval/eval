import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findOneById } from "~/server/services/Assessments";
import { updateAssessmentAction } from "../actions";
import { AssessmentRoleForm } from "./AssessmentRoleForm";

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
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <AssessmentRoleForm
        assessment={assessment}
        action={updateAssessmentAction}
      />
    </div>
  );
}
