import { cache } from "react";
import { prisma } from "~/server/db";
import { Button } from "~/components/ui/Button";
import { notFound } from "next/navigation";
import { searchIssues } from "~/server/github";
import { getCurrentUser } from "~/server/auth";
import Markdown from "~/components/Markdown";
import { Typografy } from "~/components/ui/Typography";
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

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  const assessment = await getAssessmentById(params.assessmentId);

  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <Typografy variant="h1">{assessment.title}</Typografy>
      <div className="prose">
        <Markdown content={assessment.description} />
      </div>

      <Separator className="my-4" />

      <StartAssessmentButton assessmentId={params.assessmentId} user={user} />
    </div>
  );
}
