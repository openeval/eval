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
import { AssessmentItem } from "~/components/AssessmentItem";

export const metadata = {
  title: "Assessments",
};

const getAssessments = cache(async (userId: User["id"]) => {
  // TODO: set correct assessments
  return await prisma.assessment.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
// Candidates assessesment dashboard
export default async function AssessmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const assessments = await getAssessments(user.id);

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Assessments
          </h1>
          {/* <p className="text-neutral-500">list of users</p> */}
        </div>
      </div>

      <Separator className="my-4" />

      {assessments.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {assessments.map((assessment) => (
            <AssessmentItem key={assessment.id} assessment={assessment} />
          ))}
        </div>
      )}

      {!assessments.length && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={GitBranch} />
          <EmptyPlaceholder.Title> No assessments added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Get started by creating a new one.
          </EmptyPlaceholder.Description>
          <Link
            href={"/assessments/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Add Candidate
          </Link>
        </EmptyPlaceholder>
      )}
    </>
  );
}
