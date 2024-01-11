import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

import { AssessmentNav } from "~/components/AssessmentNav";
import { CopyButton } from "~/components/ui/CopyButton";
import { Typography } from "~/components/ui/Typography";
import { absoluteUrl } from "~/lib/utils";
import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Assessments";

type AssessmentDetailPageProps = {
  children: React.ReactNode;
  params: { assessmentId: string };
};

async function fetchAssessment(id: string, organizationId) {
  return await findOneById(id, organizationId);
}

export default async function Layout({
  params,
  children,
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const assessment = await fetchAssessment(
    params.assessmentId,
    user.activeOrgId,
  );

  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">
            <Link href={"/assessments"}>Assessments</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">{assessment.title}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-8 flex flex-row items-baseline">
          <Link
            href={`${absoluteUrl("/")}a/${assessment.id}/
            ${slugify(assessment.title)}`}
            className="flex flex-row items-baseline hover:text-primary"
          >
            <Typography variant={"h1"}>{assessment.title}</Typography>
            <ExternalLink className="ml-2 h-4" />
          </Link>
          <CopyButton
            value={`${absoluteUrl("/")}a/${assessment.id}/
              ${slugify(assessment.title)}`}
            className="border-none text-slate-900 hover:bg-transparent dark:text-slate-50"
          />
        </div>
        <AssessmentNav assessmentId={assessment.id} />
      </div>

      {children}
    </div>
  );
}
