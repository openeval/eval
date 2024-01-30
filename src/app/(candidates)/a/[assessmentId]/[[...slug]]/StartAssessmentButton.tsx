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

import { useConfirmationDialog } from "~/components/alertConfirmation";
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
  const { getConfirmation } = useConfirmationDialog();

  const handleStart = async () => {
    await signIn("github", {
      callbackUrl: absoluteUrl(pathname).toString(),
    });
  };

  const onStartSession = async () => {
    const confirmation = await getConfirmation({
      message:
        " Once you start your session you will not be able to stop it. Good luck!",
    });

    if (confirmation) {
      startActionTransition(async () => {
        const res = await action(assessmentId);
        if (res.success) {
          // router.refresh();
          router.push(`/s/${res.data?.id}`);
        } else {
          toast({
            title: "Something went wrong.",
            description: res.error?.message,
            variant: "destructive",
          });
        }
      });
    }
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
      <Button
        variant="default"
        disabled={isLoading}
        onClick={() => onStartSession()}
      >
        Start
      </Button>
    );
  }
}
