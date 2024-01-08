import { AssessmentItem } from "~/components/AssessmentItem";

export default function IssuesLoading() {
  return (
    <div className="divide-y divide-muted/20 rounded-md border border-muted">
      <AssessmentItem.Skeleton />
      <AssessmentItem.Skeleton />
      <AssessmentItem.Skeleton />
      <AssessmentItem.Skeleton />
      <AssessmentItem.Skeleton />
    </div>
  );
}
