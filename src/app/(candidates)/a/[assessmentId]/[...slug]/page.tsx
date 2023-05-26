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
      <div className="prose">{assessment.description}</div>

      <Separator className="my-4" />

      <StartAssessmentButton assessmentId={params.assessmentId} user={user} />
    </div>
  );
}
