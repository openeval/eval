import { createAssessmentAction } from "../actions";
import { RoleStageForm } from "./RoleStageForm";

export const metadata = {
  title: "New Assessments",
};

export default function AddAssessmentPage() {
  return (
    <div>
      <RoleStageForm action={createAssessmentAction} />
    </div>
  );
}
