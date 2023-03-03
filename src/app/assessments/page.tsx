import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";

import { prisma } from "~/server/db";
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
      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
            No assessments added
          </h3>
          <p className="mt-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
            Get started by creating a new one.
          </p>
          <Button size="sm" className="relative">
            <Plus className="mr-2 h-4 w-4" />
            Add Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}
