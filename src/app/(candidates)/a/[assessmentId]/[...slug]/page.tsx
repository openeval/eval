import { cache } from "react";
import { prisma } from "~/server/db";
import { Button } from "~/components/ui/Button";
import { notFound } from "next/navigation";
import { searchIssues } from "~/server/github";
import { getCurrentUser } from "~/server/auth";
interface PageProps {
  params: { assessmentId: string };
}
import StartAssessmentButton from "~/components/StartAssessmentButton";
import { OpenTaskItem } from "~/components/OpenTaskItem";
import { Separator } from "~/components/ui/Separator";

const getAssessmentById = cache(async (id: string) => {
  return await prisma.assessment.findFirst({
    where: {
      id: id,
    },
  });
});

const getIssues = cache(
  async (querySearch?: { [key: string]: string | string[] | undefined }) => {
    const issuees = await searchIssues({ querySearch });
    return issuees;
  }
);

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  const assessment = await getAssessmentById(params.assessmentId);
  const issues = await getIssues(assessment?.ghIssuesQuerySeach);

  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <h1>{assessment.title}</h1>
      <div>{assessment.description}</div>

      <Separator className="my-4" />

      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>

      <StartAssessmentButton assessmentId={params.assessmentId} user={user} />
    </div>
  );
}
