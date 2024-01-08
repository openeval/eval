import { type AssessmentSession, type Candidate } from "@prisma/client";
import Link from "next/link";

import { CandidateOperations } from "~/components/CandidateOperations";
import { Skeleton } from "~/components/ui/Skeleton";
import { formatDate } from "~/lib/utils";

interface CandidateItemProps {
  candidate: Pick<
    Candidate,
    "id" | "name" | "lastName" | "email" | "createdAt"
  > & { assessmentSessions?: AssessmentSession[] };
  assessmentId?: string;
}

export function CandidateItem({ candidate, assessmentId }: CandidateItemProps) {
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
      {candidate.assessmentSessions && (
        <div>{candidate.assessmentSessions[0]?.status}</div>
      )}

      <CandidateOperations
        candidate={{ id: candidate.id, name: candidate.name }}
      />
    </div>
  );
}

CandidateItem.Skeleton = function CandidateItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
