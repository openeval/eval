import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { Typography } from "~/components/ui/Typography";
import { AssessmentNav } from "~/components/AssessmentNav";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/server/auth";
import { StepsNav } from "./StepsNav";
import {
  ChevronRight,
  ChevronsRight,
  Users,
  Settings,
  FileBadge,
  ListChecks,
  FileText,
} from "lucide-react";

type AssessmentDetailPageProps = {
  children: React.ReactNode;
};

export default async function Layout({
  params,
  children,
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();

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

  if (!user) {
    redirect("/login");
  }

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
      <StepsNav />
      {children}
    </div>
  );
}
