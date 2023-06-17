import { createAssessment } from "../actions";
import { RoleStageForm } from "./RoleStageForm";

export default function AddAssessmentPage() {
  return (
    <div>
      <RoleStageForm action={createAssessment} />
    </div>
  );
}
