"use client";

import { Progress } from "~/components/ui/Progress";
import { usePathname } from "next/navigation";

export function OnboardingProgress() {
  const pathname = usePathname();

  return <Progress value={10} className="mx-auto mb-8 max-w-md"></Progress>;
}
