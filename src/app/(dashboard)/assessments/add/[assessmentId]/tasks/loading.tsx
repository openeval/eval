import { AssessmentItem } from "~/components/AssessmentItem";

// careful loading is used everywhere here :)
export default function IssuesLoading() {
  return (
    <>
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
