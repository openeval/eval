import { notFound } from "next/navigation";

import { prisma } from "~/server/db";
import { updateAssessmentAction } from "../../../actions";
import { AssessmentSettingsForm } from "./AssessmentSettingsForm";

type AssessmentDetailPageProps = {
  params: { assessmentId: string };
};

async function fetchAssessment(id: string) {
  const assessment = await prisma.assessment.findFirst({ where: { id } });
  return assessment;
}

export default async function AssessmentDetailPage({
  params: { assessmentId },
}: AssessmentDetailPageProps) {
  const assessment = await fetchAssessment(assessmentId);
  if (!assessment) {
    notFound();
  }

  return (
    <div>
      {/* <div className="mb-8">
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
      </div> */}
      <AssessmentSettingsForm
        assessment={assessment}
        action={updateAssessmentAction}
      />
    </div>
  );
}
