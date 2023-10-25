import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { updateAssessment } from "../actions";
import { AssessmentRoleForm } from "./AssessmentRoleForm";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export default async function AssessmentDetailPage({
  params,
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const assessment = await fetchAssessment(params.assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <AssessmentRoleForm assessment={assessment} action={updateAssessment} />
    </div>
  );
}
