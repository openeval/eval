"use client";

import { type Candidate } from "@prisma/client";
import { CircleEllipsis, Loader2 as SpinnerIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { removeCandidateAction } from "~/actions/candidates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { toast } from "~/hooks/use-toast";
import { useConfirmationDialog } from "./alertConfirmation";

interface CandidateOperationsProps {
  candidate: Pick<Candidate, "id" | "name">;
}

export function CandidateOperations({ candidate }: CandidateOperationsProps) {
  const router = useRouter();
  const [isDeleteLoading, startActionTransition] = React.useTransition();
  const { getConfirmation } = useConfirmationDialog();

  async function onDeleteCandidate(candidateId: string) {
    const confirmation = await getConfirmation({
      title: "Are you sure you want to delete this Candidate?",
    });

    if (confirmation) {
      startActionTransition(async () => {
        const res = await removeCandidateAction(candidateId);
        if (res.success) {
          toast({
            title: "Success.",
            description: "Candidate removed",
          });
          router.refresh();
        } else {
          toast({
            title: "Something went wrong.",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors  hover:bg-muted">
          <CircleEllipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/candidates/${candidate.id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive"
            disabled={isDeleteLoading}
            onSelect={async (event) => {
              event.preventDefault();
              await onDeleteCandidate(candidate.id);
            }}
          >
            {isDeleteLoading ? (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
