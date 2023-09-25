"use client";

import * as React from "react";
import { formatDate } from "~/lib/utils";

import { GitMerge } from "lucide-react";

import { Skeleton } from "~/components/ui/Skeleton";
import { Contribution, Submission } from "@prisma/client";
import Link from "next/link";
interface SubmissionItemProps {
  item: Partial<Submission> & { contributions: Contribution[] };
}

export function SubmissionItem({ item }: SubmissionItemProps) {
  return (
    <div className="grid grid-cols-3 p-2 text-sm  hover:bg-slate-100">
      <div className="">
        <div className="items-center text-lg font-medium sm:flex">
          <span className="flex">
            <Link href={`submissions/${item.id}`}>
              <span className="text-zinc-400 hover:text-sky-500">
                {
                  /* @ts-expect-error  never undefined */
                  formatDate(new Date(item.createdAt).toDateString())
                }
              </span>
            </Link>
          </span>
        </div>
        <div className="">{item.status}</div>
      </div>

      <div className="">
        <span className="flex cursor-pointer font-medium hover:text-sky-500">
          {item.contributions.length > 0 && (
            <>
              <GitMerge className="mr-2 h-5 w-5" />
              {item.contributions.length}
            </>
          )}
        </span>
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
