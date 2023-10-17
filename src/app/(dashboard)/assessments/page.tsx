import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { GitBranch } from "lucide-react";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/Button";
import { cache } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { findAllForList } from "~/server/repositories/Assessments";

export const metadata = {
  title: "Assessments",
};

const getAssessmentsForUser = cache(async (where) => {
  return await findAllForList(where);
});

export default async function AssessmentPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const assessments = await getAssessmentsForUser({
    organizationId: user.activeOrgId,
  });

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Assessments
          </h1>
          <p className="text-neutral-500">tests for your candidates</p>
        </div>
        <Link
          href={"/assessments/add"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          New Assessment
        </Link>
      </div>

      <Separator className="my-4" />

      {assessments.length > 0 && (
        <DataTable columns={columns} data={assessments} />
      )}

      {!assessments.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No Assessments yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by creating a new one.
          </EmptyPlaceholder.Description>
          <Link
            href={"/assessments/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            New assessment
          </Link>
        </EmptyPlaceholder>
      )}
    </>
  );
}
