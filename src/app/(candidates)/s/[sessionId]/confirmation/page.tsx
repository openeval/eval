import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { getCurrentUser } from "~/server/auth";
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
  const session = await getCurrentUser(authOptions);
  if (!session) {
    redirect("/login");
  }

  const assessmentSession = await getAssessmentSessionById(params.sessionId);

  if (!assessmentSession) {
    notFound();
  }

  return (
    <div>
      <h1>congratulation you for your submission!</h1>
    </div>
  );
}
