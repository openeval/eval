import { notFound } from "next/navigation";
import { cache } from "react";

import Markdown from "~/components/Markdown";
import StartAssessmentButton from "~/components/StartAssessmentButton";
import { Typography } from "~/components/ui/Typography";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { startAssessmentSessionAction } from "./actions";

interface PageProps {
  params: { assessmentId: string };
}

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
      <div className="pb-12">
        <div className="prose prose-slate mx-auto lg:prose-lg">
          <Typography className="mx-auto mb-4" variant="h1">
            {assessment.title}
          </Typography>
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
              action={startAssessmentSessionAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
