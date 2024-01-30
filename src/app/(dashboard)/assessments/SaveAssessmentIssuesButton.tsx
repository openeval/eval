"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { siteConfig } from "~/config/site";
import { toast } from "~/hooks/use-toast";
import type { UpdateAssessmentAction } from "./actions";

interface SaveAssessmentIssuesButton {
  assessmentId?: string;
  action: UpdateAssessmentAction;
  flow: "create" | "update";
}

export default function SaveAssessmentIssuesButton({
  flow = "create",
  assessmentId,
  action,
}: SaveAssessmentIssuesButton) {
  const [isLoading, startActionTransition] = React.useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = (
    searchParams?.get("q") || siteConfig.github.searchQueryString
  ).toLowerCase();

  async function onSubmit() {
    startActionTransition(async () => {
      const res = await action({ id: assessmentId }, { ghIssuesQuerySeach: q });
      if (res.success) {
        toast({
          title: "Success.",
          description: "Assessment updated",
        });
        if (flow === "create") {
          router.push(`/assessments/add/${assessmentId}/settings`);
        } else {
          router.refresh();
        }
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
    <Button
      onClick={() => onSubmit()}
      disabled={isLoading}
      data-testid="confirmation-button"
      className="ml-auto"
    >
      Save
    </Button>
  );
}
