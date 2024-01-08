import { AssessmentItem } from "~/components/AssessmentItem";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";

// careful loading is used everywhere here :)
export default function DashboardLoading() {
  return (
    <>
      <div className="flex justify-between px-2">
        <div className="grid gap-1">
          <Typography variant={"h1"}>Assessments</Typography>
        </div>
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
