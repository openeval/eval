import { AssessmentItem } from "~/components/AssessmentItem";

// careful loading is used everywhere here :)
export default function IssuesLoading() {
  return (
    <>
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
