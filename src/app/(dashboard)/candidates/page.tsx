import { GitBranch } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findAllForList } from "~/server/services/Candidates";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata = {
  title: "Candidates",
};

const getCandidates = cache(async (where) => {
  return await findAllForList(where);
});

export default async function CandidatesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Candidate")) {
    redirect("/404");
  }

  const candidates = await getCandidates({ organizationId: user.activeOrgId });

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <Typography variant={"h1"}>Candidates</Typography>
        </div>
      </div>

      <Separator className="my-4" />

      {candidates.length > 0 && (
        <DataTable columns={columns} data={candidates} />
      )}

      {!candidates.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No Candidates yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by inviting Candidates to an{" "}
            <Link href="/assessments">assessment</Link>.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </>
  );
}
