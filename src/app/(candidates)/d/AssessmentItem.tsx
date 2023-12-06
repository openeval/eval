import { CandidateOnAssessmentStatus } from "@prisma/client";
import Link from "next/link";

import { Badge } from "~/components/ui/Badge";
import { Skeleton } from "~/components/ui/Skeleton";
import { Typography } from "~/components/ui/Typography";
import { formatDate, formatDateWithTime } from "~/lib/utils";
import type { CandidateAssessmentsFullData } from "~/server/repositories/Assessments";

interface AssessmentItemProps {
  data: CandidateAssessmentsFullData;
}

export function AssessmentItem({ data }: AssessmentItemProps) {
  const { assessment } = data;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/a/${assessment.id}`}
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
      <div className="flex flex-col gap-1">
        <Badge className="ml-auto w-20 flex-none">{data.status}</Badge>
        {data.status === CandidateOnAssessmentStatus.STARTED && (
          <Typography variant={"muted"}>
            Ends at:{" "}
            {formatDateWithTime(
              assessment.applicantSessions[0].expiresAt.toString(),
            )}
          </Typography>
        )}
      </div>
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
