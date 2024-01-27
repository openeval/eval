import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Submissions";

type AssessmentDetailPageProps = {
  children: React.ReactNode;
  params: { submissionId: string };
};

async function fetchSubmission(id: string) {
  return await findOneById(id);
}

export default async function Layout({
  params,
  children,
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const submission = await fetchSubmission(params.submissionId);

  if (!submission) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">
            <Link href={"/submissions"}>Submissions</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">
            Assessment: {submission.assessment.title}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
