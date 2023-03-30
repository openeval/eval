import { cache } from "react";
import { prisma } from "~/server/db";
import { Button } from "~/components/ui/Button";
import { notFound } from "next/navigation";
import { searchIssues } from "~/server/openIssues";
import { getCurrentUser } from "~/server/auth";
interface PageProps {
  params: { sessionId: string };
}
import StartAssessmentButton from "~/components/StartAssessmentButton";
import { OpenTaskItem } from "~/components/OpenTaskItem";
import { Separator } from "~/components/ui/Separator";

const getAssessmentSessionById = cache(async (id: string) => {
  return await prisma.assessmentSession.findFirst({
    where: {
      id: id,
    },
    include: { assessment: true, candidate: true },
  });
});

const getContributions = cache(
  async (querySearch?: { [key: string]: string | string[] | undefined }) => {
    const issuees = await searchIssues({ querySearch });
    return issuees;
  }
);

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  const session = await getAssessmentSessionById(params.sessionId);

  if (!session) {
    notFound();
  }
  const issues = await getContributions(session.assessment?.ghIssuesQuerySeach);

  return (
    <div>
      <h1>{session.assessment.title}</h1>
      <div>closes at 21/02/2022</div>

      <h2>Your contributions</h2>
      <ul>
        <li>One pull request</li>
      </ul>
      <Separator className="my-4" />

      <h2>Pull requests</h2>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
