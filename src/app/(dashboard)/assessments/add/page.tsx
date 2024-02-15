import { redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { createAssessmentAction } from "../actions";
import { RoleStageForm } from "./RoleStageForm";

export const metadata = {
  title: "New Assessments",
};

export default async function AddAssessmentPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "create", "Assessment")) {
    redirect("/404");
  }

  return (
    <div>
      <RoleStageForm action={createAssessmentAction} />
    </div>
  );
}
