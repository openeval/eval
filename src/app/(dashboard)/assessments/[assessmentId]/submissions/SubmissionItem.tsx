"use client";

import * as React from "react";
import { formatDate } from "~/lib/utils";

import { CircleDot, GitMerge, MessageSquare } from "lucide-react";

import { Skeleton } from "~/components/ui/Skeleton";
import { Contribution, Submission } from "@prisma/client";

interface SubmissionItemProps {
  item: Partial<Submission> & { contributions: Contribution[] };
}

export function SubmissionItem({ item }: SubmissionItemProps) {
  return (
    <div className="grid grid-cols-8 p-2 text-sm  hover:bg-slate-100">
      <div className="col-span-8 sm:col-span-6">
        <div className="items-center text-lg font-medium sm:flex">
          <span className="flex">
            <CircleDot className="mr-2 mt-1 h-5 w-5 text-green-600" />
            <span className="text-zinc-400 hover:text-sky-500">
              {formatDate(new Date(item.createdAt).toDateString())}
            </span>
          </span>
        </div>
        <div className="ml-7 text-zinc-400"></div>
      </div>

      <div className="no-wrap col-span-2 hidden justify-between pr-3 pt-2 text-right text-zinc-400 sm:flex">
        <span className="ml-2 flex cursor-pointer font-medium hover:text-sky-500">
          {item.contributions.map((contribution) => {
            return (
              <div>
                {contribution.type === "PULL_REQUEST" && (
                  <div>
                    <GitMerge />{" "}
                  </div>
                )}
              </div>
            );
          })}
        </span>
        <span className="ml-2 "></span>
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
