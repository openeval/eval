import Link from "next/link";
import { type Assessment, type Candidate } from "@prisma/client";

import { formatDate } from "~/lib/utils";
import { AssessmentOperations } from "./AssessmentOperations";
import { Skeleton } from "~/components/ui/Skeleton";

interface AssessmentItemProps {
  assessment: Pick<Assessment, "id" | "title" | "published" | "createdAt"> & {
    candidates: [Candidate];
  };
}

export function AssessmentItem({ assessment }: AssessmentItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/assessments/${assessment.id}`}
          className="font-semibold hover:underline"
        >
          {assessment.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(assessment.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <AssessmentOperations
        assessment={{ id: assessment.id, title: assessment.title }}
      />
    </div>
  );
}

AssessmentItem.Skeleton = function AssessmentItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
