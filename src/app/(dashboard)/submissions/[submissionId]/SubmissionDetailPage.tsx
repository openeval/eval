"use client";

import { GitPullRequest, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { DiffViewer } from "~/components/DiffViewer";
import Markdown from "~/components/Markdown";
import { Badge } from "~/components/ui/Badge";
import { Card, CardContent, CardHeader } from "~/components/ui/Card";
import { Separator } from "~/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { Typography } from "~/components/ui/Typography";
import { toast } from "~/hooks/use-toast";
import { timeAgo } from "~/lib/utils";
import type { EvaluationCriteriaWithChildren } from "~/server/repositories/EvaluationCriteria";
import type { SubmissionFullData } from "~/server/repositories/Submissions";
import type { SubmitReviewAction } from "../actions";
import Pie from "./Pie";
import { ReviewSubmissionForm } from "./ReviewSubmissionForm";
import { ViewScoreDetailsButton } from "./ViewScoreDetailsButton";

type SubmissionDetailPageProps = {
  submitReviewAction: SubmitReviewAction;
  data: {
    submission: NonNullable<SubmissionFullData>;
    evaluationCriterias: EvaluationCriteriaWithChildren;
  };
  diffText: string;
};

export function SubmissionDetailPage({
  data,
  diffText,
  submitReviewAction,
}: SubmissionDetailPageProps) {
  const router = useRouter();
  const { review } = data.submission;
  return (
    <div>
      {data.submission.contribution && (
        <>
          <div className="items-top mb-8 flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">
                {data.submission.contribution.title}
              </h2>
              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="mr-2 py-2">
                  <GitPullRequest className="x-4 mr-1 h-4" />{" "}
                  {data.submission.contribution.state}
                </Badge>{" "}
                <Typography variant={"subtle"}>
                  {timeAgo(data.submission.contribution.meta?.created_at)}
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
              <div className="prose pb-8 dark:prose-invert">
                <Markdown
                  content={
                    (data.submission.contribution.description as string) ||
                    "No description provided."
                  }
                />
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Suspense fallback={<Loader className="h-8 w-8" />}>
                <DiffViewer diffText={diffText}></DiffViewer>
              </Suspense>
            </TabsContent>
          </Tabs>
          <Separator></Separator>

          {review && (
            <Card className="my-4" key={review.id}>
              <CardHeader className="rounded-t-lg bg-muted px-4 py-2 ">
                <Typography variant={"subtle"}>
                  {timeAgo(review.createdAt)}
                </Typography>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row">
                <div className="flex flex-col pt-4">
                  <div className="mx-auto w-[240px]">
                    <Pie {...review.plot} />
                  </div>
                  <ViewScoreDetailsButton
                    review={review}
                    evaluationCriterias={data.evaluationCriterias}
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <span className="font-semibold leading-none tracking-tight">
                    Feedback
                  </span>
                  <div className="pt-4">
                    <Markdown content={(review.note as string) || ""} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!review && (
            <ReviewSubmissionForm
              submission={data.submission}
              evaluationCriterias={data.evaluationCriterias}
              action={submitReviewAction}
              onSuccess={() => {
                toast({
                  title: "Success.",
                  description: "Review submitted",
                });
                router.refresh();
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
