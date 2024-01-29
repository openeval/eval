import { Separator } from "~/components/ui/Separator";
import { Skeleton } from "~/components/ui/Skeleton";
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
        <div className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </>
  );
}
