import { notFound } from "next/navigation";
import { cache } from "react";

import { prisma } from "~/server/db";

interface PageProps {
  params: { sessionId: string };
}

const getAssessmentSessionById = cache(async (id: string) => {
  return await prisma.assessmentSession.findFirst({
    where: {
      id: id,
    },
    include: { assessment: true, candidate: true },
  });
});

export default async function Page({ params }: PageProps) {
  const session = await getAssessmentSessionById(params.sessionId);

  if (!session) {
    notFound();
  }

  return (
    <div>
      <h1>congratulation you for your submission!</h1>
    </div>
  );
}
