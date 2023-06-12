import { getCurrentUser } from "~/server/auth";
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
  const user = await getCurrentUser();
  const assessment = await fetchAssessment(params.assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href={"/assessments"}>Assessments</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">{assessment.title}</div>
        </div>
      </div>
      <div className="mb-8">
        <Typografy variant={"h1"} className="mb-8">
          {assessment.title}
        </Typografy>
        <AssessmentNav assessmentId={assessment.id} />
      </div>

      <AssessmentRoleForm assessment={assessment} action={updateAssessment} />
    </div>
  );
}
