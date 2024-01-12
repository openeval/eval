import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import Markdown from "~/components/Markdown";
import { Typography } from "~/components/ui/Typography";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { startAssessmentSessionAction } from "./actions";
import { StartAssessmentButton } from "./StartAssessmentButton";

interface PageProps {
  params: { assessmentId: string };
}

const getAssessmentById = cache(async (id: string, candidateId) => {
  return await prisma.assessment.findFirst({
    where: {
      id: id,
      published: true,
    },
    include: {
      applicantSessions: {
        where: {
          candidateId,
        },
      },
    },
  });
});

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { candidate } = user;

  const assessment = await getAssessmentById(
    params.assessmentId,
    candidate?.id,
  );

  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <div className="pb-12">
        <div className="prose prose-slate mx-auto dark:prose-invert lg:prose-lg">
          <Typography className="mx-auto mb-4" variant="h1">
            {assessment.title}
          </Typography>
          <Markdown content={assessment.description} />
        </div>
        <div
          tabIndex={-1}
          className="fixed bottom-0 left-0 z-50 flex w-full  bg-muted p-4 "
        >
          <div className="container flex justify-end">
            <StartAssessmentButton
              assessmentId={params.assessmentId}
              applicantSession={assessment?.applicantSessions[0]}
              user={user}
              action={startAssessmentSessionAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
