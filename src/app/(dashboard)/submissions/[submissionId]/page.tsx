import { notFound } from "next/navigation";

import { findAllWithChildren } from "~/server/repositories/EvaluationCriteria";
import * as submissionRepo from "~/server/repositories/Submissions";
import { submitReviewAction } from "../actions";
import { SubmissionDetailPage } from "./SubmissionDetailPage";

type SubmissionDetailPageProps = {
  params: {
    assessmentId: string;
    submissionId: string;
  };
};

export default async function Page({ params }: SubmissionDetailPageProps) {
  // need to get this endpoint for changes

  const submission = await submissionRepo.findByIdFull(params.submissionId, {
    plotReviewsData: true,
  });

  if (!submission) {
    notFound();
  }

  const diffText = await fetch(
    submission.contribution?.meta?.pull_request.diff_url,
  ).then((r) => r.text());

  const evaluationCriterias = await findAllWithChildren();

  const data = {
    submission,
    evaluationCriterias,
  };

  return (
    <SubmissionDetailPage
      data={data}
      submitReviewAction={submitReviewAction}
      diffText={diffText}
    />
  );
}
