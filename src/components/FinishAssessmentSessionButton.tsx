"use client";
import { Button } from "~/components/ui/Button";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";

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
}
// add alert to start
export default function FinishAssessmentSessionButton({
  sessionId,
}: FinishAssessmentSessionButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const onStartSession = async () => {
    //given the current user
    // create an assessment session
    // linke the user to the candidate linked to its email if exist
    // otherwise create a new candidate
    setIsLoading(true);

    const data = { sessionId };
    // Mutate external data source
    const response = await fetch(`/api/finishAssessmentSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // This forces a cache invalidation.
      router.refresh();

      const session = await response.json();

      router.push(`/s/${session.id}/confirmation`);
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your request failed. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
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
            onClick={() => onStartSession()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
