import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
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
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const assessmentSession = await getAssessmentSessionById(params.sessionId);

  if (!assessmentSession) {
    notFound();
  }

  return (
    <div>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Congratulations</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>Your submission has been sent.</h1>

          <Button className="mt-8" asChild>
            <Link href="/d">Continue</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
