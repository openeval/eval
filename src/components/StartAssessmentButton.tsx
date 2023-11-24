"use client";

import type { AssessmentSession } from "@prisma/client";
import { type User } from "next-auth";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import { Button } from "~/components/ui/Button";
import { toast } from "~/hooks/use-toast";
import { absoluteUrl } from "~/lib/utils";

interface StartAssessmentButtonProps {
  assessmentId: string;
  user?: User;
  className?: string;
  action: (data) => Promise<AssessmentSession>;
}
// add alert to start
export default function StartAssessmentButton({
  user,
  assessmentId,
  className,
  action,
}: StartAssessmentButtonProps) {
  const router = useRouter();
  const [isLoading, startActionTransition] = React.useTransition();
  const pathname = usePathname();

  const handleStart = async () => {
    await signIn("github", {
      callbackUrl: absoluteUrl(pathname).toString(),
    });
  };

  const onStartSession = async () => {
    //given the current user
    // create an assessment session
    startActionTransition(async () => {
      try {
        const res = await action(assessmentId);
        if (res.error) {
          throw new Error();
        }
        // router.refresh();
        router.push(`/s/${res.id}`);
      } catch (e) {
        // TODO: how to handle errors in with server actions
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (!user) {
    return (
      <Button className={className} onClick={() => handleStart()}>
        Login with Github to start
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Start</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Once you start your session you will have 24 hours to submit your
            open source contribution. Good luck!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onStartSession()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
