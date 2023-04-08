"use client";

import * as React from "react";
import { formatDate } from "~/lib/utils";

import { CircleDot, GitMerge, MessageSquare } from "lucide-react";

import { Skeleton } from "~/components/ui/Skeleton";

interface IIssueData {
  id: string;
  entity: string;
  repo: string;
  title: string;
  number: string;
  date: string;
  created_at: string;
  user: { login: string; html_url: string };
  tags: string[];
  taskTotal: number | null;
  taskCompleted: number | null;
  linkedPR: number;
  assignees: string[];
  comments: number;
  repository_url: string;
  html_url: string;
}

interface OpenTaskItemProps {
  item: IIssueData;
}

export function OpenTaskItem({ item }: OpenTaskItemProps) {
  return (
    <div className="grid grid-cols-8 p-2 text-sm  hover:bg-slate-100">
      <div className="col-span-8 sm:col-span-6">
        <div className="items-center text-lg font-medium sm:flex">
          <span className="flex">
            <CircleDot className="mr-2 mt-1 h-5 w-5 text-green-600" />
            <a className="text-zinc-400 hover:text-sky-500" href={item.repo}>
              {item.repository_url.split("/").slice(-2).join("/")}
            </a>
          </span>

          <a className="pl-7  hover:text-sky-500 sm:pl-3" href={item.html_url}>
            {item.title}
          </a>
        </div>
        <div className="ml-7 text-zinc-400">
          #{item.number} opened{" "}
          {formatDate(new Date(item.created_at).toDateString())} by{" "}
          <a className="hover:text-sky-500" href={item.user.html_url}>
            {item.user.login}
          </a>
        </div>
      </div>

      <div className="no-wrap col-span-2 hidden justify-between pt-2 pr-3 text-right text-zinc-400 sm:flex">
        <span className="ml-2 flex cursor-pointer font-medium hover:text-sky-500">
          {item.linkedPR ? (
            <>
              <GitMerge className="mr-2 h-5 w-5" />
              {item.linkedPR}
            </>
          ) : null}
        </span>
        <span className="ml-2 "></span>
        <span className="ml-2 flex cursor-pointer font-medium hover:text-sky-500">
          {item.comments ? (
            <>
              <MessageSquare className="mr-2 h-5 w-5" />
              {item.comments}
            </>
          ) : null}
        </span>
      </div>
    </div>
  );
}

OpenTaskItem.Skeleton = function OpenTaskItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
