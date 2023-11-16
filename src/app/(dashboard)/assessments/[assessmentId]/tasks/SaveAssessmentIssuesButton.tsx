"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { siteConfig } from "~/config/site";
import { toast } from "~/hooks/use-toast";
import type { UpdateAssessmentAction } from "../../actions";

interface SaveAssessmentIssuesButton {
  assessmentId?: string;
  action: UpdateAssessmentAction;
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
      const res = await action({ id: assessmentId }, { ghIssuesQuerySeach: q });
      if (res.success) {
        toast({
          title: "Success.",
          description: "Assessment updated",
        });

        router.refresh();
      } else {
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
      Save
    </Button>
  );
}
