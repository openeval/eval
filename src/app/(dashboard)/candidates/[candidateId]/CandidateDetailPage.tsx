import { Candidate } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Badge } from "~/components/ui/Badge";
import { Card, CardContent, CardHeader } from "~/components/ui/Card";
import { Typography } from "~/components/ui/Typography";
import { formatDate } from "~/lib/utils";
import { CandidateProfileOps } from "./CandidateProfileOps";
import { SubmissionItem } from "./SubmissionItem";

type CandidateDetailPageProps = {
  data: { candidate: Candidate };
};

export default function CandidateDetailPage({
  data,
}: CandidateDetailPageProps) {
  const { candidate } = data;
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
              <AvatarFallback className="uppercase">
                {candidate.name.charAt(0) + candidate.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-bold leading-none">
                {candidate.name} {candidate.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(candidate.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <Badge variant={"outline"} className="mb-2">
              {candidate.status}
            </Badge>
          </div>

          <div className="flex items-center justify-self-end">
            <CandidateProfileOps />
          </div>
        </CardContent>
      </Card>

      {/* <Card className="mb-6 pt-6"> */}
      {/* <CardHeader>
          
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2"> */}
      <div className="mb-8">
        <Typography variant={"h2"}> Github stats</Typography>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-y-2">
          <div className="flex flex-grow">
            {/* contributions */}
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${candidate.ghUsername}&theme=github`}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* contributions */}
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${candidate.ghUsername}&theme=github`}
              className="w-full"
            />
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${candidate.ghUsername}&theme=github`}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* </CardContent>
      </Card> */}

      <Typography variant={"h2"} className="mb-8">
        Submissions
      </Typography>

      {candidate.submissions && candidate.submissions.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
          {candidate.submissions.map((submission) => (
            <SubmissionItem key={submission.id} item={submission} />
          ))}
        </div>
      )}

      {!candidate.submissions && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Title> No submissions yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            The Candidate did not submit a submission yet
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </div>
  );
}
