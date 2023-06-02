"use client";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/Sheet";
import { InviteCandidateForm } from "~/components/InviteCandidateForm";

interface InviteCandidateButtonProps {
  assessmentId: string;
}
export function InviteCandidateButton({
  assessmentId,
}: InviteCandidateButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Invite</Button>
      </SheetTrigger>
      <SheetContent position="right">
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <InviteCandidateForm assessmentId={assessmentId} />
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
