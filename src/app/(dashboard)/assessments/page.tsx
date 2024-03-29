import { GitBranch } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { buttonVariants } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { cn } from "~/lib/utils";
import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findAllForList } from "~/server/services/Assessments";
import { columns } from "./columns";
import { AssessmentsDataTable } from "./data-table";

export const metadata = {
  title: "Assessments",
};

const getAssessmentsForUser = cache(async (where, opts) => {
  return await findAllForList(where, opts);
});

export default async function AssessmentPage({ searchParams }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Assessment")) {
    redirect("/404");
  }

  const { data: assessments, count } = await getAssessmentsForUser(
    {
      organizationId: user.activeOrgId,
    },
    {
      page: searchParams.page,
    },
  );

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <Typography variant="h1">Assessments</Typography>
          <Typography variant="muted">tests for your candidates</Typography>
        </div>
        <Link
          href={"/assessments/add"}
          className={cn(buttonVariants({ variant: "default" }))}
          data-testid="add-assessment-button"
        >
          New Assessment
        </Link>
      </div>

      <Separator className="my-4" />

      {assessments.length > 0 && (
        <AssessmentsDataTable
          dataCount={count}
          columns={columns}
          data={assessments}
        />
      )}

      {!assessments.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title>No Assessments yet</EmptyPlaceholder.Title>
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
