"use client";

import { useRouter } from "next/navigation";

import { updateAssessmentAction } from "../../actions";
import { AssessmentSettingsForm } from "../../AssessmentSettingsForm";

export const AssessmentSettingsPage = ({ data }) => {
  const router = useRouter();

  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      reviewees={data.members}
      action={updateAssessmentAction}
      onSuccess={() => router.refresh()}
    />
  );
};
