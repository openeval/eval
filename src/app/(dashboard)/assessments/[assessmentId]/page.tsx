import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { Typografy } from "~/components/ui/Typography";
import { ChevronRight } from "lucide-react";
import { AssessmentNav } from "~/components/AssessmentNav";
import { AssessmentRoleForm } from "./AssessmentRoleForm";
import Link from "next/link";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

import { updateAssessment } from "./actions";

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export default async function AssessmentDetailPage({
  params,
}: AssessmentDetailPageProps) {
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
