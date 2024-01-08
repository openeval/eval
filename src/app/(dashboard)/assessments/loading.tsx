import Link from "next/link";

import { AssessmentItem } from "~/components/AssessmentItem";
import { buttonVariants } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { cn } from "~/lib/utils";

// careful loading is used everywhere here :)
export default function DashboardLoading() {
  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <Typography variant={"h1"}>Assessments</Typography>
        </div>
        <Link
          href={"/assessments/add"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          New Assessment
        </Link>
      </div>

      <Separator className="my-4" />
      <div className="divide-y divide-muted/20 rounded-md border border-muted">
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
      </div>
    </>
  );
}
