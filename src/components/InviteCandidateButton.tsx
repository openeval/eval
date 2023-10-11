"use client";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/Sheet";
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
      <SheetContent side="right">
        <InviteCandidateForm
          onSuccess={onSuccess}
          assessmentId={assessmentId}
        />
      </SheetContent>
    </Sheet>
  );
}
