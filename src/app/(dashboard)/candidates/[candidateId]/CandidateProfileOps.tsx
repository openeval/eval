"use client";

import { CandidateStatus, type Candidate } from "@prisma/client";
import { CircleEllipsis, Loader2 as SpinnerIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useConfirmationDialog } from "~/components/alertConfirmation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/Sheet";
import { toast } from "~/hooks/use-toast";
import type { UpdateCandidateAction } from "../action";
import { CandidateUpdateForm } from "./CandidateUpdateForm";

interface CandidateProfileOpsProps {
  candidate: Candidate;
  updateCandidateAction: UpdateCandidateAction;
}

export function CandidateProfileOps({
  candidate,
  updateCandidateAction,
}: CandidateProfileOpsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isArchivingLoading, startActionTransition] = React.useTransition();
  const { getConfirmation } = useConfirmationDialog();

  async function archiveCandidate(candidateId: string) {
    const confirmation = await getConfirmation();
    if (confirmation) {
      startActionTransition(async () => {
        // unlink the user to the candidate in order we can onboarding them again
        const res = await updateCandidateAction(candidateId, {
          status: CandidateStatus.ARCHIVED,
          user: { disconnect: true, update: { completedOnboarding: false } },
        });

        if (res.success) {
          router.refresh();
          toast({
            title: "Success.",
            description: "Candidate updated",
          });
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

  function onSuccess() {
    router.refresh();
    setIsOpen(false);
    toast({
      title: "Success.",
      description: "Candidate updated",
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <CircleEllipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onClick={() => setIsOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive"
            onClick={async (event) => {
              event.preventDefault();
              await archiveCandidate(candidate.id);
            }}
          >
            {isArchivingLoading ? (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right">
          <SheetHeader className="mb-4">
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>

          <CandidateUpdateForm
            candidate={candidate}
            action={updateCandidateAction}
            onSuccess={onSuccess}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
