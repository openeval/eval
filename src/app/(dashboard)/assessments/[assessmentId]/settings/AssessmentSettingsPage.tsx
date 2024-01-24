"use client";

import { updateAssessmentAction } from "../../actions";
import { AssessmentSettingsForm } from "../../AssessmentSettingsForm";

export const AssessmentSettingsPage = ({ data }) => {
  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      reviewees={data.members}
      action={updateAssessmentAction}
    />
  );
};
