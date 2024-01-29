"use client";

import { SubmissionStatus } from "@prisma/client";
import {
  ChevronDown,
  GitPullRequest,
  Loader,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

import { useConfirmationDialog } from "~/components/alertConfirmation";
import { DiffViewer } from "~/components/DiffViewer";
import Markdown from "~/components/Markdown";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Separator } from "~/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { Typography } from "~/components/ui/Typography";
import { toast } from "~/hooks/use-toast";
import { timeAgo } from "~/lib/utils";
import type { EvaluationCriteriaWithChildren } from "~/server/repositories/EvaluationCriteria";
import type { SubmissionFullData } from "~/server/repositories/Submissions";
import {
  deleteReviewAction,
  rejectSubmissionAction,
  type SubmitReviewAction,
} from "../actions";
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
  const { reviews, candidate } = data.submission;
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewEditDialog, setReviewEditDialog] = useState(false);

  const [isDelitingReviewLoading, startActionTransition] = useTransition();
  const [isRejectingSubmissionLoading, startActionRejectingTransition] =
    useTransition();

  const { getConfirmation } = useConfirmationDialog();

  const onDeleteReview = async (id) => {
    const confirm = await getConfirmation();

    if (confirm) {
      startActionTransition(async () => {
        const res = await deleteReviewAction(id);
        if (res.success) {
          toast({
            title: "Success.",
            description: "Review deleted",
          });
          router.refresh();
        }
      });
    }
  };

  const onRejectSubmission = async (id) => {
    const confirm = await getConfirmation();

    if (confirm) {
      startActionRejectingTransition(async () => {
        const res = await rejectSubmissionAction(id);
        if (res.success) {
          toast({
            title: "Success.",
            description: "Status updated",
          });
          router.refresh();
        }
      });
    }
  };

  return (
    <div>
      {data.submission.contribution && (
        <>
          <div className="items-top mb-8 flex flex-col justify-between md:flex-row">
            <div className="flex w-full flex-col">
              <div className="flex flex-row items-end justify-between md:items-baseline">
                <Typography variant={"h1"}>
                  {data.submission.contribution.title}
                </Typography>
                <Badge variant={"outline"}>{data.submission.status}</Badge>
              </div>
              <div className="mt-2 flex items-center">
                <GitPullRequest className="mr-2 h-6 w-6" />{" "}
                <Typography variant={"subtle"}>
                  {timeAgo(data.submission.contribution.meta?.created_at)} by{" "}
                  <strong>{candidate.name}</strong>
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

                <div className="mb-2 ml-auto flex w-auto items-center space-x-1 self-end rounded-md bg-primary ">
                  <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
                    <DialogTrigger asChild>
                      <Button variant="default" className="px-3 shadow-none">
                        Review
                      </Button>
                    </DialogTrigger>

                    <DialogContent className={"max-h-[90vh] overflow-y-scroll"}>
                      <DialogHeader>
                        <DialogTitle>Review</DialogTitle>
                        <DialogDescription>
                          evaluate the performance of current submission
                        </DialogDescription>
                      </DialogHeader>

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
                          setReviewDialog(!reviewDialog);
                        }}
                      />
                    </DialogContent>
                  </Dialog>

                  <Separator
                    orientation="vertical"
                    className="h-[20px] text-secondary-foreground"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" className="px-2 shadow-none">
                        <ChevronDown className="h-4 w-4 text-primary-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      alignOffset={-5}
                      className="w-[200px]"
                      forceMount
                    >
                      <DropdownMenuItem
                        disabled={
                          isRejectingSubmissionLoading ||
                          data.submission.status !== SubmissionStatus.REJECTED
                        }
                        className="flex cursor-pointer items-center text-destructive"
                        onSelect={async () => {
                          await onRejectSubmission(data.submission.id);
                        }}
                      >
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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

          {reviews.map((review) => (
            <Card className="my-4" key={review.id}>
              <div className="flex flex-row items-center justify-between rounded-t-lg bg-muted px-4 py-0">
                <Typography variant={"subtle"}>
                  <strong>
                    {review.createdBy.name || review.createdBy.email}
                  </strong>
                  {" posted "}
                  {timeAgo(review.createdAt)}
                </Typography>
                <Dialog
                  open={reviewEditDialog}
                  onOpenChange={setReviewEditDialog}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      alignOffset={-5}
                      className="w-[200px]"
                      forceMount
                    >
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          disabled={isDelitingReviewLoading}
                          className="flex cursor-pointer items-center"
                        >
                          Edit
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        disabled={isDelitingReviewLoading}
                        className="flex cursor-pointer items-center text-destructive"
                        onSelect={async () => {
                          await onDeleteReview(review.id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DialogContent className={"max-h-[90vh] overflow-y-scroll"}>
                    <DialogHeader>
                      <DialogTitle>Review</DialogTitle>
                      <DialogDescription>
                        evaluate the performance of current submission
                      </DialogDescription>
                    </DialogHeader>

                    <ReviewSubmissionForm
                      submission={data.submission}
                      evaluationCriterias={data.evaluationCriterias}
                      review={review}
                      action={submitReviewAction}
                      onSuccess={() => {
                        toast({
                          title: "Success.",
                          description: "Review updated",
                        });
                        router.refresh();
                        setReviewEditDialog(!reviewEditDialog);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {/* TODO add edit mode */}
              </div>
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
          ))}
        </>
      )}
    </div>
  );
}
