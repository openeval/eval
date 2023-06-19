"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Steps } from "~/components/ui/Steps";
import { Users, Settings, ListChecks, FileText } from "lucide-react";
import { absoluteUrl } from "~/lib/utils";

type StepItem = {
  name: string;
  title: string;
  description: string;
  icon: React.FC<{ className: string }>;
  href : string;
};

export function StepsNav() {
  const path = usePathname();
  const params = useParams();

  function getStepPath(step: StepItem, assessmentId?: string | string[]) {
    let path = `/assessments/add`;
    if (assessmentId) {
      path += `/${assessmentId}/${step.name}`;
    }
    return path;
  }

  const items: StepItem[] = [
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
      href: `/assessments/add/${params?.assessmentId|| ''}/tasks`,
    },
    {
      name: "settings",
      title: "Settings",
      description: "Role description",
      icon: Settings,
      href: `/assessments/add/${params?.assessmentId|| ''}/settings`,
    },
    {
      name: "invite",
      title: "Invite",
      description: "Role description",
      icon: Users,
      href: `/assessments/add/${params?.assessmentId}/invite`
    },
  ];

  return (
    <Steps className="mb-8">
      {items.map((step, index) => {
        return (
          <Steps.Item isActive={path === step.href} key={index}>
            <Steps.Icon icon={step.icon} />
            <Steps.Content>
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Description>{step.description} </Steps.Description>
            </Steps.Content>
          </Steps.Item>
        );
      })}
    </Steps>
  );
}
