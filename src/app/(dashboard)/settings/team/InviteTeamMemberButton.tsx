"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/Sheet";
import { toast } from "~/hooks/use-toast";
import { InviteTeamMemberForm } from "./InviteTeamMemberForm";

export function InviteTeamMemberButton({}) {
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
        <InviteTeamMemberForm onSuccess={onSuccess} />
      </SheetContent>
    </Sheet>
  );
}
