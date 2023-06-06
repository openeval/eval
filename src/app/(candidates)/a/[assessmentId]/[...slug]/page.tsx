import { cache } from "react";
import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from "~/server/auth";
import Markdown from "~/components/Markdown";
import { Typografy } from "~/components/ui/Typography";
interface PageProps {
  params: { assessmentId: string };
}
import StartAssessmentButton from "~/components/StartAssessmentButton";

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
      <Typografy className="mb-4" variant="h1">
        {assessment.title}
      </Typografy>
      <div className="pb-12">
        <div className="prose pb-8">
          <Markdown content={assessment.description} />
        </div>
        <div
          tabIndex={-1}
          className="fixed bottom-0 left-0 z-50 flex w-full  bg-gray-50 p-4 "
        >
          <div className="container flex justify-end">
            <StartAssessmentButton
              assessmentId={params.assessmentId}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
