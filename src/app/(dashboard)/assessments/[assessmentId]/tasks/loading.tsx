import { AssessmentItem } from "~/components/AssessmentItem";

export default function IssuesLoading() {
  return (
    <>
      <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
        <AssessmentItem.Skeleton />
      </div>
    </>
  );
}
