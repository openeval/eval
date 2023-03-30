import { Separator } from "~/components/ui/Separator";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/Button";

import { AssessmentItem } from "~/components/AssessmentItem";

// careful loading is used everywhere here :)
export default function IssuesLoading() {
  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide text-slate-900">
            Tasks
          </h1>
          <p className="text-neutral-500">tests for your candidates</p>
        </div>
      </div>

      <Separator className="my-4" />
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
      </div>
    </>
  );
}
