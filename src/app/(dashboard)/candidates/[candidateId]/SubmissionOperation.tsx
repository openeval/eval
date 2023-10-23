"use client";

import { type Submission } from "@prisma/client";
import { CircleEllipsis } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

interface SubmissionOperationsProps {
  submission: Pick<Submission, "id">;
}

export function SubmissionOperations({
  submission,
}: SubmissionOperationsProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <CircleEllipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/submissions/${submission.id}`}
              className="flex w-full"
            >
              View
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
