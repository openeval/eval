import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { GitBranch, Plus } from "lucide-react";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { prisma } from "~/server/db";
import { buttonVariants } from "~/components/ui/Button";
export default async function AssessmentPage() {
  const session = await getServerSession(authOptions);
  const examples = await prisma.example.findMany();

  if (!session) {
    redirect("auth/signin");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter ">
        Assessments
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        tests for your candidates
      </p>
      <Separator className="my-4" />

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
          Add Assessment
        </Link>
      </EmptyPlaceholder>
    </div>
  );
}
