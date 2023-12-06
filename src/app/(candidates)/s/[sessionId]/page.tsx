import { GitBranch } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { OpenTaskItem } from "~/components/OpenTaskItem";
import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { formatDateWithTime } from "~/lib/utils";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import {
  getProfile,
  searchIssues,
  searchPullRequestContributions,
} from "~/server/github";
import { findOneByCandidate } from "~/server/repositories/AssessmentSessions";
import { finishAssessmentSessionAction } from "./actions";
import { FinishAssessmentSessionButton } from "./FinishAssessmentSessionButton";

interface PageProps {
  params: { sessionId: string };
}

const getAssessmentSession = cache(async (id: string, candidateId?: string) => {
  return await findOneByCandidate(id, candidateId);
});

const getIssues = cache(async (querySearch?: string[] | string | null) => {
  const issuees = await searchIssues({ querySearch });
  return issuees;
});

const getPullRequests = cache(async (user, session) => {
  const account = await prisma.account.findFirst({
    where: { userId: user.id, provider: "github" },
  });
  if (!account) {
    return [];
  }
  const ghProfile = await getProfile(account.providerAccountId);
  const fromDate = new Date(session.startedAt).toISOString();
  const toDate = new Date(session.expiresAt).toISOString();

  const pr = await searchPullRequestContributions(
    ghProfile.login,
    session.assessment.ghIssuesQuerySeach + ` created:${fromDate}..${toDate}`,
  );

  return pr;
});

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const session = await getAssessmentSession(
    params.sessionId,
    user.candidate?.id,
  );

  if (!session) {
    notFound();
  }

  const [issues, contributions] = await Promise.all([
    getIssues(session.assessment?.ghIssuesQuerySeach),
    getPullRequests(user, session),
  ]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="grid gap-1">
          <Typography variant="h1">{session.assessment.title}</Typography>
          <Typography variant="muted">
            closes at {formatDateWithTime(session.expiresAt.toString())}
          </Typography>
        </div>

        {contributions.length > 0 && (
          <FinishAssessmentSessionButton
            finishAssessmentSessionAction={finishAssessmentSessionAction}
            sessionId={params.sessionId}
            contributions={contributions}
          />
        )}
      </div>

      <Typography variant="p" className="mb-8 max-w-2xl">
        To qualify for the role, make an open source contribution to one of the
        issues listed below. We collect your contributions and send it to the
        recruiter when you submit your assessment.
      </Typography>

      <Typography variant={"h3"}>Requirements</Typography>
      <Typography variant={"ul"}>
        <li>One pull request</li>
      </Typography>

      <Separator className="my-4" />

      <Typography variant={"h3"} className="mb-4">
        Issues
      </Typography>
      <div className="mb-8">
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {issues.items.map((item) => (
            <OpenTaskItem key={item.id} item={item} />
          ))}
        </div>

        <Button asChild variant={"link"} className="block text-center">
          {/* TODO: remove external links */}
          <Link
            target="_blank"
            href={`https://github.com/search?q=no:assignee state:open ${session.assessment?.ghIssuesQuerySeach} &type=issues`}
          >
            view full list
          </Link>
        </Button>
      </div>
      <Typography variant={"h3"}>Contributions</Typography>
      <Typography variant={"p"} className="mb-4">
        Here is the list of open contribution. We only track pull requests for
        the related repositories{" "}
      </Typography>

      {contributions.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {contributions.map((item) => (
            <OpenTaskItem key={item.id} item={item} type="pull-request" />
          ))}
        </div>
      )}

      {!contributions.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No contributions yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by creating a new pull request.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </div>
  );
}
