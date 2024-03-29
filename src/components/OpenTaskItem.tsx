"use client";

import type { components } from "@octokit/openapi-types";
import { CircleDot, GitBranch, MessagesSquare } from "lucide-react";
import * as React from "react";

import { Skeleton } from "~/components/ui/Skeleton";
import { cn, formatDate, truncateString } from "~/lib/utils";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";

interface OpenTaskItemProps {
  item: components["schemas"]["issue-search-result-item"];
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  type?: "issue" | "pull-request";
}

export function OpenTaskItem({
  item,
  active,
  type = "issue",
  ...props
}: OpenTaskItemProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col p-4 hover:bg-muted", {
        "bg-muted": active,
      })}
    >
      <a
        className="text-md mb-2 text-muted-foreground hover:text-primary"
        href={item.repository_url.replace("api.github.com/repos", "github.com")}
      >
        {item.repository_url.split("/").slice(-2).join("/")}
      </a>
      <div className="">
        <div className="text-md items-center font-medium sm:flex">
          <span className="flex items-center">
            {type === "issue" && (
              <CircleDot className="mr-2 h-5 w-5 flex-none text-green-600" />
            )}
            {type === "pull-request" && (
              <GitBranch
                className={cn(
                  "flex-non mr-2 h-5 w-5",
                  item.state === "open" && "text-green-600",
                  item.state === "closed" && "text-purple-600",
                )}
              />
            )}

            <a
              className="text-truncate overflow-hidden  hover:text-primary"
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
        <div className="mt-3 flex flex-row items-center gap-2 text-muted-foreground">
          {item.user && (
            <a
              className="flex flex-row items-center hover:text-primary"
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
        <span className="mt-2 flex hover:text-primary">
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
