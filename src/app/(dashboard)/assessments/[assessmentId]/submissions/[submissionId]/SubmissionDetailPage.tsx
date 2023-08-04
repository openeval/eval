"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db";
import { Typography } from "~/components/ui/Typography";
import { DiffViewer } from "./DiffViewer";
import "react-diff-view/style/index.css";
import { Badge } from "~/components/ui/Badge";
import Markdown from "~/components/Markdown";
import { Separator } from "~/components/ui/Separator";
import { Button } from "~/components/ui/Button";
import { Textarea } from "~/components/ui/Textarea";
import { GitPullRequest } from "lucide-react";
type SubmissionDetailPageProps = {
  submissionId: string;
  diffText: string;
};

export function SubmissionDetailPage({
  submissionId,
  diffText,
}: SubmissionDetailPageProps) {
  return (
    <div>
      <div className="flex flex-row items-top justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Assessment session fix</h2>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="py-2 mr-2">
              <GitPullRequest className="h-4 x-4 mr-1" /> Open
            </Badge>{" "}
            <Typography variant={"subtle"}>created 2 days ago</Typography>
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
              content={`## What does this MR do and why?

candidates will start a new session when applying to an assignment
sessions will helps to to collect the contributions in the given time 

## MR acceptance list

 - it should have a test`}
            />
          </div>

          <Separator></Separator>
          <form className="mt-4">
            <Textarea placeholder="leave a comment on the review" />
            <div className="flex flex-row gap-x-2 mt-4">
              <Button variant={"destructive"}>Reject</Button>
              <Button variant={"default"}>Approve</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="code">
          <DiffViewer diffText={diffText}></DiffViewer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
