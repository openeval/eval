import { cache } from "react";
import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { searchIssues, searchContributions, getProfile } from "~/server/github";
import { getCurrentUser } from "~/server/auth";
import FinishAssessmentSessionButton from "~/components/FinishAssessmentSessionButton";
interface PageProps {
  params: { sessionId: string };
}
import { OpenTaskItem } from "~/components/OpenTaskItem";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { finishAssessmentSessionAction } from "./actions";
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
  },
);

const getPullRequests = cache(async (user, assessment) => {
  const account = await prisma.account.findFirst({
    where: { userId: user.id, provider: "github" },
  });
  const ghProfile = await getProfile(account.providerAccountId);
  const pr = await searchContributions(
    ghProfile.login,
    assessment.ghIssuesQuerySeach,
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

  return (
    <div>
      <div className="flex justify-between">
        <div className="grid gap-1">
          <Typography variant="h1">{session.assessment.title}</Typography>
          <Typography variant="small">
            closes at {session.expiresAt.toString()}
          </Typography>
        </div>
        <FinishAssessmentSessionButton
          action={finishAssessmentSessionAction}
          sessionId={params.sessionId}
        />
      </div>

      <Typography variant="p">
        To qualify for the role , make an open source contribution to any of the
        issues listed below. we will collect your contributions and send it to
        the recruiter when you submit your assessment
      </Typography>

      <Typography variant={"h3"}>Requirements</Typography>
      <Typography variant={"ul"}>
        <li>One pull request</li>
      </Typography>
      <Separator className="my-4" />

      <Typography variant={"h3"}>Issues</Typography>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>

      <Typography variant={"h3"}>Contributions</Typography>
      <Typography variant={"p"}>
        Here is the list of open contribution. We only track pull requests for
        the related repositories{" "}
      </Typography>
      <div className="mt-8 divide-y divide-neutral-200 rounded-md border border-slate-200">
        {contributions.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
