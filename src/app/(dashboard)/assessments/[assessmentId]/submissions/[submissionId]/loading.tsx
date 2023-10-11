import { AssessmentItem } from "~/components/AssessmentItem";

export default function DashboardLoading() {
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
