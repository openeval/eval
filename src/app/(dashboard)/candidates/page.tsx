import { GitBranch } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { buttonVariants } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";
import { cn } from "~/lib/utils";
import { getCurrentUser } from "~/server/auth";
import { findAllForList } from "~/server/repositories/Candidates";
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

  const candidates = await getCandidates({ organizationId: user.activeOrgId });

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Candidates
          </h1>
        </div>
        <Link
          href={"/candidates/add"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Candidate
        </Link>
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
            Get started by inviting a new one.
          </EmptyPlaceholder.Description>
          <Link
            href={"/candidates/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Candidate
          </Link>
        </EmptyPlaceholder>
      )}
    </>
  );
}
