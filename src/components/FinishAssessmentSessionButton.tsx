"use client";
import { Button } from "~/components/ui/Button";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";
import { type AssessmentSession } from "@prisma/client";
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

interface FinishAssessmentSessionButtonProps {
  sessionId: string;
  finishAssessmentSessionAction: (
    sessionId: string,
  ) => Promise<AssessmentSession>;
}
// add alert to start
export default function FinishAssessmentSessionButton({
  sessionId,
  finishAssessmentSessionAction,
}: FinishAssessmentSessionButtonProps) {
  const [isLoading, startActionTransition] = React.useTransition();
  const router = useRouter();

  const onFinishSession = async () => {
    //given the current user
    // create an assessment session
    startActionTransition(async () => {
      try {
        await finishAssessmentSessionAction(sessionId);

        // router.refresh();
        router.push(`/s/${sessionId}/confirmation`);
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Submit assessment</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            We will not longer track contributions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onFinishSession()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
