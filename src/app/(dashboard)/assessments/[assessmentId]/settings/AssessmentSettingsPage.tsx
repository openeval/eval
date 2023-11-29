"use client";

import { updateAssessmentAction } from "../../actions";
import { AssessmentSettingsForm } from "../../AssessmentSettingsForm";

export const AssessmentSettingsPage = ({ data }) => {
  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      action={updateAssessmentAction}
    />
  );
};
