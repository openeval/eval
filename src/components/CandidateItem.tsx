import Link from "next/link";
import { type Candidate } from "@prisma/client";

import { formatDate } from "~/lib/utils";
import { CandidateOperations } from "~/components/CandidateOperations";
import { Skeleton } from "~/components/ui/Skeleton";

interface CandidateItemProps {
  candidate: Pick<
    Candidate,
    "id" | "name" | "lastName" | "email" | "createdAt"
  >;
}

export function CandidateItem({ candidate }: CandidateItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/candidates/${candidate.id}`}
          className="font-semibold hover:underline"
        >
          {candidate.name} {candidate.lastName}
        </Link>
        <div>
          <p className="text-sm text-slate-600">{candidate.email}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(candidate.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <CandidateOperations
        candidate={{ id: candidate.id, name: candidate.name }}
      />
      {/* <CandidateDeleteButton Candidate={{ id: Candidate.id, name: Candidate.name }} /> */}
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
