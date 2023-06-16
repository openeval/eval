import { createAssessment } from "../actions";
import { RoleStageForm } from "./RoleStageForm";
import {
  ChevronRight,
  ChevronsRight,
  Users,
  Settings,
  FileBadge,
  ListChecks,
  FileText,
} from "lucide-react";
import { Typography } from "~/components/ui/Typography";
import { Steps } from "~/components/ui/Steps";

import Link from "next/link";
export default function AddAssessmentPage() {
  let currentStep = "details";
  let stepsItems = [
    {
      name: "details",
      title: "Details",
      description: "Role description",
      icon: FileText,
    },
    {
      name: "tasks",
      title: "Tasks",
      description: "Role description",
      icon: ListChecks,
    },
    {
      name: "settings",
      title: "Settings",
      description: "Role description",
      icon: Settings,
    },
    {
      name: "invite",
      title: "Invite",
      description: "Role description",
      icon: Users,
    },
  ];

  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href={"/assessments"}>Assessments</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">New assessment</div>
        </div>
      </div>

      <div>
        <Typography variant="h1"></Typography>

        <Steps className="mb-8">
          {stepsItems.map((step, i) => (
            <Steps.Item key={i} isActive={currentStep === step.name}>
              <Steps.Icon icon={step.icon} />
              <Steps.Content>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>{step.description} </Steps.Description>
              </Steps.Content>
            </Steps.Item>
          ))}
        </Steps>
      </div>

      <RoleStageForm action={createAssessment} />
    </div>
  );
}
