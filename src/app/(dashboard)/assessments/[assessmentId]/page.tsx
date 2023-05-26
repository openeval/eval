import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { Typografy } from "~/components/ui/Typography";

import { AssessmentNav } from "~/components/AssessmentNav";
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
  const assessment = await fetchAssessment(params.assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <Typografy variant={"h1"} className="lg:text-md">
        {assessment.title}
      </Typografy>
      <AssessmentNav assessmentId={assessment.id} />
    </div>
  );
}
