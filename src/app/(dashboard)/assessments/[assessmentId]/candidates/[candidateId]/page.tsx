import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { getProfile, searchContributions } from "~/server/github";
import { format } from "date-fns";
import { Typografy } from "~/components/ui/Typography";
import { OpenTaskItem } from "~/components/OpenTaskItem";

const getCandidate = async (candidateId: string, assessmentId: string) => {
  return prisma.candidate.findFirst({
    where: {
      id: candidateId,
    },
    include: {
      user: {
        include: { accounts: true },
      },
      assessmentSessions: {
        where: {
          assessmentId: assessmentId,
        },
      },
    },
  });
};
type CandidateDetailPageProps = {
  params: {
    assessmentId: string;
    candidateId: string;
  };
};
export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const user = await getCurrentUser();
  const candidate = await getCandidate(params.candidateId, params.assessmentId);

  const queryString = `created:${format(
    new Date(candidate.assessmentSessions[0]?.startedAt),
    "yyyy-MM-dd"
  )}..${format(
    new Date(candidate.assessmentSessions[0]?.finishedAt),
    "yyyy-MM-dd"
  )}`;
  const githubUserId = candidate.user?.accounts.find(
    (a) => a.provider === "github"
  )?.providerAccountId;
  const ghProfile = await getProfile(githubUserId);
  console.log(ghProfile);
  const contributions = await searchContributions(ghProfile.login, queryString);

  return (
    <div>
      <Typografy variant={"h3"}>
        {candidate.name} {candidate.lastName}
      </Typografy>
      <p>{candidate.email}</p>

      {/* TODO:use suspense */}
      <Typografy variant="h2">Contributions</Typografy>
      <Typografy variant={"p"}>Contributions made to the assessment</Typografy>
      <div className="mt-8 divide-y divide-neutral-200 rounded-md border border-slate-200">
        {contributions.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
