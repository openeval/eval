import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findOneById } from "~/server/repositories/Candidates";

type CandidateDetailPageProps = {
  children: React.ReactNode;
  params: { candidateId: string };
};

async function fetchCandidate(id: string, organizationId) {
  return await findOneById(id, organizationId);
}

export default async function Layout({
  params,
  children,
}: CandidateDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const candidate = await fetchCandidate(params.candidateId, user.activeOrgId);

  if (!candidate) {
    notFound();
  }

  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">
            <Link href={"/candidates"}>Candidate</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">
            {candidate.name} {candidate.lastName}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
