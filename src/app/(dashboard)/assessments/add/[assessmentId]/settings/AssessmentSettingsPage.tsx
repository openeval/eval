"use client";

import type { Assessment } from "@prisma/client";
import { redirect } from "next/navigation";

import { updateAssessmentAction } from "../../../actions";
import { AssessmentSettingsForm } from "../../../AssessmentSettingsForm";

type AssessmentSettingsPageProps = {
  data: { assessment: Assessment };
};

export const AssessmentSettingsPage = ({
  data,
}: AssessmentSettingsPageProps) => {
  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      action={updateAssessmentAction}
      onSuccess={() =>
        redirect(`/assessments/add/${data.assessment.id}/invite`)
      }
    />
  );
};
