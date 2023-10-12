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
import { findAllForList } from "~/server/repositories/Submissions";

export const metadata = {
  title: "Submissions",
};

const getSubmissions = cache(async (userId: User["id"]) => {
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

export default async function SubmissionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const submissions = await findAllForList({
    organizationId: user.activeOrgId,
  });

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Submissions
          </h1>
          {/* <p className="text-neutral-500">list of users</p> */}
        </div>
        {/* <Link
          href={"/submissions/add"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Assessment
        </Link> */}
      </div>

      <Separator className="my-4" />

      {submissions.length > 0 && (
        <DataTable columns={columns} data={submissions} />
      )}

      {!submissions.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No submissions added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by creating a new assessment.
          </EmptyPlaceholder.Description>
          <Link
            href={"/assessments/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Assessment
          </Link>
        </EmptyPlaceholder>
      )}
    </>
  );
}
