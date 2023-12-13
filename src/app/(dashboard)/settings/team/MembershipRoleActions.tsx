"use client";

import { MembershipRole } from "@prisma/client";
import { ChevronDownIcon, Loader2 as SpinnerIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/AlertDialog";
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
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isArchivingLoading, startActionTransition] = React.useTransition();
  const [isUpdateRoleLoading, startUpdateRoleActionTransition] =
    React.useTransition();

  async function onRemoveMembership(membershipId: string) {
    startActionTransition(async () => {
      const res = await removeMembershipAction(membershipId);
      if (res.success) {
        toast({
          title: "Success.",
          description: "Member removed",
        });
        router.refresh();
      }
    });
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex w-1/5 justify-between">
            {membership.role}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {roleList.map(({ name, description, value }, key) => (
            <DropdownMenuItem
              key={key}
              onSelect={() => onUpdateRoleMembership(membership.id, value)}
              className="flex flex-col items-start px-4 py-2"
            >
              <p>{name}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </DropdownMenuItem>
          ))}

          {membership.role !== MembershipRole.OWNER && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={() => setShowDeleteAlert(true)}
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

      {/* TODO: create an alert provider  */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove it?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                onRemoveMembership(membership.id);
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isArchivingLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Remove</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
