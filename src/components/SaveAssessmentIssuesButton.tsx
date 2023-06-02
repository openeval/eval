"use client";

import { Button } from "~/components/ui/Button";
import { toast } from "~/hooks/use-toast";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, type KeyboardEvent } from "react";
import { type Assessment } from "@prisma/client";
import { siteConfig } from "~/config/site";

interface SaveAssessmentIssuesButton {
  assessmentId?: string;
}
export default function SaveAssessmentIssuesButton({
  assessmentId,
}: SaveAssessmentIssuesButton) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const q = searchParams?.get("q") || siteConfig.github.searchQueryString;

  const router = useRouter();
  async function onSubmit() {
    setIsLoading(true);

    // Mutate external data source
    const response = await fetch(`/api/assessments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: assessmentId, ghIssuesQuerySeach: q }),
    });

    if (response.ok) {
      // This forces a cache invalidation.
      router.refresh();
      const assessment: Assessment = await response.json();
      router.push(`/assessments/${assessment.id}/settings`);
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your request failed. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <Button onClick={() => onSubmit()} isLoading={isLoading}>
      Next
    </Button>
  );
}
