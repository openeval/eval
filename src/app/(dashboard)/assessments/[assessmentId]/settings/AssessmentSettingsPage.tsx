"use client";

import { useRouter } from "next/navigation";

import { updateAssessmentAction } from "../../actions";
import { AssessmentSettingsForm } from "../../AssessmentSettingsForm";

export const AssessmentSettingsPage = ({ data }) => {
  const router = useRouter();
  console.log(data.members);
  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      reviewees={data.members}
      action={updateAssessmentAction}
      onSuccess={() => router.refresh()}
    />
  );
};
