"use client";

import type { Prisma } from "@prisma/client";
import { GitMerge } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Progress } from "~/components/ui/Progress";
import { Skeleton } from "~/components/ui/Skeleton";
import { formatDate } from "~/lib/utils";
import { SubmissionOperations } from "./SubmissionOperation";

interface SubmissionItemProps {
  item: Prisma.SubmissionGetPayload<{ include: { contribution; review } }>;
}

export function SubmissionItem({ item }: SubmissionItemProps) {
  return (
    <div className="grid grid-cols-4 p-4 text-sm  hover:bg-slate-100">
      <div className="grid gap-1">
        <div className="items-center text-lg font-medium sm:flex">
          <span className="flex">
            <Link href={`submissions/${item.id}`}>
              <span className="text-zinc-400 hover:text-sky-500">
                {formatDate(new Date(item.createdAt).toDateString())}
              </span>
            </Link>
          </span>
        </div>
        <div className="">{item.status}</div>
      </div>

      <div className="grid gap-1">
        <span className="flex cursor-pointer font-medium hover:text-sky-500">
          {item.contribution && (
            <>
              <GitMerge className="ml-2 h-4 w-4" />
            </>
          )}
        </span>
      </div>
      <div className="grid w-2/6  text-right">
        {item.review && (
          <>
            <div>{item.review.totalScore}%</div>
            <Progress value={item.review.totalScore} className="h-4 " />
          </>
        )}
      </div>
      <div className="flex items-center justify-end">
        <SubmissionOperations submission={{ id: item.id }} />
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
