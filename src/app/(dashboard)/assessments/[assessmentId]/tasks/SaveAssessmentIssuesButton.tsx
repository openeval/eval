"use client";

import { type Prisma } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { siteConfig } from "~/config/site";
import { toast } from "~/hooks/use-toast";

interface SaveAssessmentIssuesButton {
  assessmentId?: string;
  action: (
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput,
  ) => Promise<unknown>;
}

export default function SaveAssessmentIssuesButton({
  assessmentId,
  action,
}: SaveAssessmentIssuesButton) {
  const [isLoading, startActionTransition] = React.useTransition();

  const searchParams = useSearchParams();

  const q = searchParams?.get("q") || siteConfig.github.searchQueryString;

  const router = useRouter();
  async function onSubmit() {
    startActionTransition(async () => {
      try {
        await action({ id: assessmentId }, { ghIssuesQuerySeach: q });
        toast({
          title: "Success.",
          description: "Assessment updated",
        });

        router.refresh();
      } catch (e) {
        // TODO: how to handle errors in with server actions
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Button onClick={() => onSubmit()} disabled={isLoading}>
      Next
    </Button>
  );
}
