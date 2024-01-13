"use client";

import {
  AssessmentSessionStatus,
  type AssessmentSession,
} from "@prisma/client";
import { type User } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
import type { StartAssessmentSessionAction } from "./actions";

interface StartAssessmentButtonProps {
  assessmentId: string;
  user?: User;
  className?: string;
  action: StartAssessmentSessionAction;
  applicantSession?: AssessmentSession;
}
// add alert to start
export function StartAssessmentButton({
  user,
  assessmentId,
  className,
  action,
  applicantSession,
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
      const res = await action(assessmentId);
      if (res.success) {
        // router.refresh();
        router.push(`/s/${res.data?.id}`);
      } else {
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

  if (applicantSession) {
    return (
      <Button>
        {applicantSession.status === AssessmentSessionStatus.STARTED ? (
          <Link href={`/s/${applicantSession.id}`}>Continue</Link>
        ) : (
          <Link href={`/`}>Go Back</Link>
        )}
      </Button>
    );
  } else {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default">Start</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Once you start your session you will not be able to stop it. Good
              luck!
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
}
