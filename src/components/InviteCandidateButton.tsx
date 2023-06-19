"use client";
import { useState } from "react";
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
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";

interface InviteCandidateButtonProps {
  assessmentId: string;
}
export function InviteCandidateButton({
  assessmentId,
}: InviteCandidateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function onSuccess() {
    router.refresh();
    setIsOpen(false);
    toast({
      title: "Success.",
      description: "Invitation sent",
    });
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <InviteCandidateForm
          onSuccess={onSuccess}
          assessmentId={assessmentId}
        />
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
