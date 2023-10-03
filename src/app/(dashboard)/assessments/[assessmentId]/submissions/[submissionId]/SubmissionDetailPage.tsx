"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { Suspense } from "react";
import { format, formatDistance, subDays } from "date-fns";

import { Typography } from "~/components/ui/Typography";
import { DiffViewer } from "./DiffViewer";
import "react-diff-view/style/index.css";
import { Badge } from "~/components/ui/Badge";
import Markdown from "~/components/Markdown";
import { Separator } from "~/components/ui/Separator";
import { Button } from "~/components/ui/Button";
import { Textarea } from "~/components/ui/Textarea";
import { GitPullRequest, Loader } from "lucide-react";
import { Contribution, Submission } from "@prisma/client";

type SubmissionDetailPageProps = {
  submission: Submission & { contributions: Contribution[] };
  diffText: string;
};

export function SubmissionDetailPage({
  submission,
  diffText,
}: SubmissionDetailPageProps) {
  return (
    <div>
      {submission.contributions.length > 0 && (
        <>
          <div className="items-top mb-4 flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">
                {submission.contributions[0].title}
              </h2>
              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="mr-2 py-2">
                  <GitPullRequest className="x-4 mr-1 h-4" />{" "}
                  {submission.contributions[0].state}
                </Badge>{" "}
                <Typography variant={"subtle"}>
                  {formatDistance(
                    new Date(submission.contributions[0].meta.created_at),
                    new Date(),
                    { addSuffix: true },
                  )}
                </Typography>
              </div>
            </div>
          </div>

          <Tabs defaultValue="preview" className="relative mr-auto w-full">
            <div className="flex items-center justify-between pb-3">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Changes
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="preview">
              <div className="prose pb-8">
                <Markdown
                  content={submission.contributions[0].description as string}
                />
              </div>
              <Separator></Separator>
              <form className="mt-4">
                <Textarea placeholder="leave a comment on the review" />
                <div className="mt-4 flex flex-row gap-x-2">
                  <Button variant={"destructive"}>Reject</Button>
                  <Button variant={"default"}>Approve</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="code">
              <Suspense fallback={<Loader className="h-8 w-8" />}>
                <DiffViewer diffText={diffText}></DiffViewer>
              </Suspense>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
