import { cache } from "react";
import { prisma } from "~/server/db";
import { Button } from "~/components/ui/Button";
import { notFound } from "next/navigation";
import { searchIssues, searchContributions } from "~/server/openIssues";
import { getCurrentUser } from "~/server/auth";
interface PageProps {
  params: { sessionId: string };
}
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

const getIssues = cache(
  async (querySearch?: { [key: string]: string | string[] | undefined }) => {
    const issuees = await searchIssues({ querySearch });
    return issuees;
  }
);

const getPullRequests = cache(async (user, assessment) => {
  const account = await prisma.account.findFirst({
    where: { userId: user.id, provider: "github" },
  });
  const pr = await searchContributions(
    account.providerAccountId,
    assessment.ghIssuesQuerySeach
  );
  return pr;
});

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  const session = await getAssessmentSessionById(params.sessionId);

  if (!session) {
    notFound();
  }
  const issues = await getIssues(session.assessment?.ghIssuesQuerySeach);

  const contributions = await getPullRequests(user, session.assessment);

  console.log(contributions);

  return (
    <div>
      <h1>{session.assessment.title}</h1>
      <div>closes at 21/02/2022</div>

      <p>
        To qualify for the role , make an open source contribution to any of the
        issues listed below. we will collect your contributions and send it to
        the recruiter when you submit your assessment
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>One pull request</li>
      </ul>
      <Separator className="my-4" />

      <h2>Issues</h2>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>

      <h2>Contributions</h2>
    </div>
  );
}
