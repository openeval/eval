import { GitBranch } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { buttonVariants } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { cn } from "~/lib/utils";
import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findAllForList } from "~/server/services/Submissions";
import { columns } from "./columns";
import { SubmissionsDataTable } from "./data-table";

export const metadata = {
  title: "Submissions",
};

const getSubmissions = async (where, opts) => {
  return await findAllForList(where, opts);
};

export default async function SubmissionsPage({ params, searchParams }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Submission")) {
    redirect("/404");
  }

  const { data: submissions, count } = await getSubmissions(
    {
      organizationId: user.activeOrgId,
      assessmentId: params.assessmentId,
    },
    {
      page: searchParams.page,
    },
  );

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <Typography variant="h1">Submissions</Typography>
        </div>
      </div>

      <Separator className="my-4" />

      {submissions.length > 0 && (
        <SubmissionsDataTable
          columns={columns}
          data={submissions}
          dataCount={count}
        />
      )}

      {!submissions.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No submissions yet</EmptyPlaceholder.Title>
          {!params.assessmentId && (
            <>
              <EmptyPlaceholder.Description>
                Get started by creating a new assessment.
              </EmptyPlaceholder.Description>
              <Link
                href={"/assessments/add"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Add Assessment
              </Link>
            </>
          )}
        </EmptyPlaceholder>
      )}
    </>
  );
}
