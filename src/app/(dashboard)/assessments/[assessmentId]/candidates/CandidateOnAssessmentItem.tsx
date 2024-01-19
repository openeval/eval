import Link from "next/link";

import { CandidateOperations } from "~/components/CandidateOperations";
import { Skeleton } from "~/components/ui/Skeleton";
import { formatDate } from "~/lib/utils";
import type { CandidateOnAssessmentItems } from "~/server/repositories/Candidates";

interface CandidateOnAssessmentItemProps {
  item: CandidateOnAssessmentItems[0];
}

export function CandidateOnAssessmentItem({
  item,
}: CandidateOnAssessmentItemProps) {
  const { candidate, assessmentId } = item;
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={
            assessmentId
              ? `/assessments/${assessmentId}/candidates/${candidate.id}`
              : `/candidates/${candidate.id}`
          }
          className="font-semibold hover:underline"
        >
          {candidate.name} {candidate.lastName}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">{candidate.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(candidate.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <div>{item.status}</div>

      <CandidateOperations
        candidate={{ id: candidate.id, name: candidate.name }}
      />
    </div>
  );
}

CandidateOnAssessmentItem.Skeleton =
  function CandidateOnAssessmentItemSkeleton() {
    return (
      <div className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  };
