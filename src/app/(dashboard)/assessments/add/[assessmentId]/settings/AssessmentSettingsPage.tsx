"use client";

import type { Assessment } from "@prisma/client";
import { redirect } from "next/navigation";

import type { MembershipsByOrg } from "~/server/services/Membership";
import { updateAssessmentAction } from "../../../actions";
import { AssessmentSettingsForm } from "../../../AssessmentSettingsForm";

type AssessmentSettingsPageProps = {
  data: { assessment: Assessment; members: MembershipsByOrg };
};

export const AssessmentSettingsPage = ({
  data,
}: AssessmentSettingsPageProps) => {
  return (
    <AssessmentSettingsForm
      assessment={data.assessment}
      reviewees={data.members}
      action={updateAssessmentAction}
      onSuccess={() =>
        redirect(`/assessments/add/${data.assessment.id}/invite`)
      }
    />
  );
};
