"use client";

import { Button } from "~/components/ui/Button";
import { toast } from "~/hooks/use-toast";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, type KeyboardEvent } from "react";
import { type Assessment } from "@prisma/client";
import { siteConfig } from "~/config/site";
import { z } from "zod";
import * as React from "react";
import { Prisma } from "@prisma/client";
const assessmentSchema = z.object({
  ghSearchQuery: z.string(),
});

type FormData = z.infer<typeof assessmentSchema>;

interface SaveAssessmentIssuesButton {
  assessmentId?: string;
  action: (
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput
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
    // @ts-expect-error canary issue
    startActionTransition(async () => {
      try {
        await action({ id: assessmentId }, { ghIssuesQuerySeach: q });
        toast({
          title: "Success.",
          description: "Assessment updated",
        });

        router.push(`/assessments/add/${assessmentId}/settings`);
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
    <Button onClick={() => onSubmit()} isLoading={isLoading}>
      Next
    </Button>
  );
}
