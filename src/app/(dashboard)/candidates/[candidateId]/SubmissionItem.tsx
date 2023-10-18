"use client";

import type { Prisma } from "@prisma/client";
import { GitMerge } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Badge } from "~/components/ui/Badge";
import { Progress } from "~/components/ui/Progress";
import { Skeleton } from "~/components/ui/Skeleton";
import { formatDate } from "~/lib/utils";
import { SubmissionOperations } from "./SubmissionOperation";

interface SubmissionItemProps {
  item: Prisma.SubmissionGetPayload<{ include: { review; contribution } }>;
}

export function SubmissionItem({ item }: SubmissionItemProps) {
  return (
    <div className="grid gap-y-4 p-4 text-sm hover:bg-slate-100 sm:grid-cols-3">
      <div className="grid gap-1">
        <div className="items-center text-lg font-medium sm:flex">
          <span className="flex">
            <Link href={`/submissions/${item.id}`}>
              <span className="">{item.assessment.title}</span>
            </Link>
          </span>
        </div>
        <div className="">
          <span className="flex cursor-pointer font-medium hover:text-sky-500">
            {item.contribution && (
              <>
                <GitMerge className="mr-2 h-4 w-4" />
                <div>{item.contribution.title}</div>
              </>
            )}
          </span>
        </div>
        <Link href={`/submissions/${item.id}`}>
          <span className="text-zinc-400 hover:text-sky-500">
            {formatDate(new Date(item.createdAt).toDateString())}
          </span>
        </Link>
      </div>

      <div className="grid w-2/6 sm:justify-self-center">
        <div>
          <Badge variant={"outline"} className="mb-2">
            {item.status}
          </Badge>
        </div>
        {item.review && (
          <div className="flex flex-row items-center">
            <Progress value={item.review.totalScore} className="mr-2 h-4 " />
            <div>{item.review.totalScore}%</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end">
        <SubmissionOperations submission={item} />
      </div>
    </div>
  );
}

SubmissionItem.Skeleton = function SubmissionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
