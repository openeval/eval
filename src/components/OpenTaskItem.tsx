"use client";

import type { components } from "@octokit/openapi-types";
import { CircleDot, MessagesSquare } from "lucide-react";
import * as React from "react";

import { Skeleton } from "~/components/ui/Skeleton";
import { cn, formatDate, truncateString } from "~/lib/utils";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";

interface OpenTaskItemProps {
  item: components["schemas"]["issue-search-result-item"];
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function OpenTaskItem({ item, active, ...props }: OpenTaskItemProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col p-4 hover:bg-slate-100", {
        "bg-cyan-50": active,
      })}
    >
      <a
        className="text-md mb-2 text-slate-400 hover:text-sky-500"
        href={item.repository_url}
      >
        {item.repository_url.split("/").slice(-2).join("/")}
      </a>
      <div className="">
        <div className="text-md items-center font-medium sm:flex">
          <span className="flex items-center">
            <CircleDot className="mr-2 h-5 w-5 flex-none text-green-600" />
            <a
              className="text-truncate overflow-hidden  hover:text-sky-500"
              href={item.html_url}
            >
              {truncateString(item.title, 200)}
            </a>
          </span>
        </div>
        <p className="text-truncate my-2 max-h-20 w-full  overflow-hidden text-sm">
          {item.body && truncateString(item.body, 200)}
        </p>
        <div className="flex flex-row flex-wrap gap-2 text-sm font-normal">
          {item.labels.map((label) => (
            <Badge key={label.id} variant={"outline"}>
              {label.name}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex flex-row items-center gap-2 text-slate-400">
          {item.user && (
            <a
              className="flex flex-row items-center hover:text-sky-500"
              href={item.user.html_url}
            >
              <Avatar className="mr-2 h-4 w-4">
                <AvatarImage src={item.user.avatar_url} />
              </Avatar>
              {item.user.login}
            </a>
          )}

          <div>
            {formatDate(new Date(item.created_at).toDateString())} #
            {item.number}
          </div>
        </div>
      </div>

      <div className="">
        <span className="mt-2 flex cursor-pointer hover:text-sky-500">
          {item.comments ? (
            <>
              <MessagesSquare className="mr-2 h-5 w-5" />
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
