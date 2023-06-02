"use client";
import { type User } from "next-auth";
import { signIn } from "next-auth/react";
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

interface StartAssessmentButtonProps {
  user?: User;
  assessmentId: string;
}
// add alert to start
export default function StartAssessmentButton({
  user,
  assessmentId,
}: StartAssessmentButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleStart = async () => {
    await signIn("github", {
      callbackUrl:
        "http://localhost:3000/a/098d1643-d8b8-4116-bdc8-e9e1de817672/other1",
    });
  };

  const onStartSession = async () => {
    //given the current user
    // create an assessment session
    // linke the user to the candidate linked to its email if exist
    // otherwise create a new candidate
    setIsLoading(true);

    const data = { assessmentId };
    // Mutate external data source
    const response = await fetch(`/api/startAssessmentSession`, {
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

      router.push(`/s/${session.id}`);
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your request failed. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  if (!user) {
    return (
      <Button onClick={() => handleStart()}>Login with Github to start</Button>
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
            open source contributtion. Good luck!
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
