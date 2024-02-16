"use client";

import { MembershipRole } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useConfirmationDialog } from "~/components/alertConfirmation";
import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { roleList } from "~/config/security";
import { toast } from "~/hooks/use-toast";
import { removeMembershipAction, updateMembershipRoleAction } from "./actions";

export const MembershipRoleActions = ({ membership }) => {
  const router = useRouter();
  const [isArchivingLoading, startActionTransition] = React.useTransition();
  const [_isUpdateRoleLoading, startUpdateRoleActionTransition] =
    React.useTransition();
  const { getConfirmation } = useConfirmationDialog();

  async function onRemoveMembership(membershipId: string) {
    const conf = await getConfirmation();
    if (conf) {
      startActionTransition(async () => {
        const res = await removeMembershipAction(membershipId);
        if (res.success) {
          toast({
            title: "Success.",
            description: "Member removed",
          });
          router.refresh();
        } else {
          toast({
            title: "Something went wrong.",
            description: res.error?.message,
            variant: "destructive",
          });
        }
      });
    }
  }

  async function onUpdateRoleMembership(membershipId: string, role) {
    startUpdateRoleActionTransition(async () => {
      const res = await updateMembershipRoleAction(membershipId, role);
      if (res.success) {
        toast({
          title: "Success.",
          description: "Role updated",
        });
        router.refresh();
      } else {
        toast({
          title: "Something went wrong.",
          description: res.error?.message || "Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between md:w-1/5">
          {membership.role}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {roleList.map(({ name, description, value }, key) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => onUpdateRoleMembership(membership.id, value)}
            className="flex flex-col items-start "
          >
            <p>{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </DropdownMenuItem>
        ))}

        {membership.role !== MembershipRole.OWNER && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={isArchivingLoading}
              onSelect={async () => await onRemoveMembership(membership.id)}
              className="flex flex-col items-start px-4 py-2 text-red-600 hover:text-red-600 aria-selected:text-red-600"
            >
              <p>Remove</p>
              <p className="text-sm text-muted-foreground">
                Remove team member
              </p>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
