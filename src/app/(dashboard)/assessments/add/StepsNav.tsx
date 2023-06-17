"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Steps } from "~/components/ui/Steps";
import { Users, Settings, ListChecks, FileText } from "lucide-react";

export function StepsNav() {
  const path = usePathname();
  const { assessmentId }: { assessmentId?: string } = useParams();

  const items = [
    {
      name: "details",
      title: "Details",
      description: "Role description",
      icon: FileText,
      href: `/assessments/add`,
    },
    {
      name: "tasks",
      title: "Tasks",
      description: "Role description",
      icon: ListChecks,
      href: `/assessments/add/${assessmentId}/tasks`,
    },
    {
      name: "settings",
      title: "Settings",
      description: "Role description",
      icon: Settings,
      href: `/assessments/add/${assessmentId}/settings`,
    },
    {
      name: "invite",
      title: "Invite",
      description: "Role description",
      icon: Users,
      href: `/assessments/add/`,
    },
  ];

  return (
    <Steps className="mb-8">
      {items.map((step, index) => {
        return (
          <Steps.Item isActive={path === step.href} key={index} asChild>
            <Link href={step.href}>
              <Steps.Icon icon={step.icon} />
              <Steps.Content>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>{step.description} </Steps.Description>
              </Steps.Content>
            </Link>
          </Steps.Item>
        );
      })}
    </Steps>
  );
}
