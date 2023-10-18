"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

type AssessmentNavProps = {
  assessmentId: string;
};
export function AssessmentNav({ assessmentId }: AssessmentNavProps) {
  const path = usePathname();
  const items = [
    {
      title: "Info",
      href: `/assessments/${assessmentId}`,
    },
    {
      title: "Tasks",
      href: `/assessments/${assessmentId}/tasks`,
    },
    {
      title: "Candidates",
      href: `/assessments/${assessmentId}/candidates`,
    },
    {
      title: "Submissions",
      href: `/assessments/${assessmentId}/submissions`,
    },
    {
      title: "Settings",
      href: `/assessments/${assessmentId}/settings`,
    },
  ];
  return (
    <nav className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  //   path === item.href ? "bg-slate-200" : "transparent"
                )}
                data-state={
                  path?.includes(item.href, 1) ? "active" : "inactive"
                }
              >
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
