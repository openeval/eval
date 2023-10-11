import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { GitBranch } from "lucide-react";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/Button";
import { cache } from "react";
import prisma from "~/server/db";
import { type User } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
export const metadata = {
  title: "Candidates",
};

const getCandidates = cache(async (userId: User["id"]) => {
  return await prisma.candidate.findMany({
    where: {
      createdById: userId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

// TODO: move to query table
export default async function CandidatesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const candidates = await getCandidates(user.id);

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Candidates
          </h1>
          {/* <p className="text-neutral-500">list of users</p> */}
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
          <EmptyPlaceholder.Title> No candidates added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by creating a new one.
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
