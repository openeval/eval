import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/Avatar";

import { Typography } from "~/components/ui/Typography";
import { ChevronRight } from "lucide-react";
import { CandidateProfileOps } from "./CandidateProfileOps";
import Link from "next/link";
import { Badge } from "~/components/ui/Badge";

type CandidateDetailPageProps = {
  data: { candidate: Candidate };
};

import { CandidateForm } from "./CandidateForm";
import { Card, CardContent } from "~/components/ui/Card";
import { Candidate } from "@prisma/client";

export default function CandidateDetailPage({
  data,
}: CandidateDetailPageProps) {
  return (
    <div>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">
            <Link href={"/candidates"}>Candidates</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">{"idhard idhard"}</div>
        </div>
      </div>

      <Card className="mb-6 pt-6">
        <CardContent className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <Badge variant={"outline"} className="mb-2">
                INVITED
              </Badge>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
              <p className="text-sm text-muted-foreground">October 12, 2023</p>
            </div>
          </div>

          <div className="flex justify-self-end">
            <CandidateProfileOps />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
