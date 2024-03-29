import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { StepsNav } from "./StepsNav";

type AssessmentDetailPageProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AssessmentDetailPageProps) {
  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">
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
