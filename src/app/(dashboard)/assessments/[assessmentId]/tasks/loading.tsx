import { Skeleton } from "~/components/ui/Skeleton";

export default function IssuesLoading() {
  return (
    <div className="divide-y divide-muted/20 rounded-md border border-muted">
      <div className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
