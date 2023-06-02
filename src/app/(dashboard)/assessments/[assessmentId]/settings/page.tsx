import { notFound } from "next/navigation";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { AssessmentSettingsForm } from "~/components/AssessmentSettingsForm";
import slugify from "slugify";
import { absoluteUrl } from "~/lib/utils";
import { AssessmentNav } from "~/components/AssessmentNav";
type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

import { CopyButton } from "~/components/ui/CopyButton";

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export default async function AssessmentDetailPage({
  params: { assessmentId },
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();
  const assessment = await fetchAssessment(assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900">
          {assessment.title}
        </h1>
        <AssessmentNav assessmentId={assessmentId} />
        <div className="mt-4 flex">
          <pre className="flex h-11 items-center justify-between space-x-2 overflow-x-auto rounded-lg border border-slate-100 bg-slate-100 pr-2 pl-2 dark:border-slate-700 dark:bg-black ">
            <code className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-50">
              {absoluteUrl("/")}a/{assessmentId}/{slugify(assessment.title)}
            </code>
            <CopyButton
              value={`${absoluteUrl("/")}a/${assessmentId}/
              ${slugify(assessment.title)}`}
              className="border-none text-slate-900 hover:bg-transparent dark:text-slate-50"
            />
          </pre>
        </div>
      </div>
      <AssessmentSettingsForm assessmentId={assessmentId} />
    </div>
  );
}
