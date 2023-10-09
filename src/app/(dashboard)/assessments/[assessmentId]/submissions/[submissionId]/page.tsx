import { SubmissionDetailPage } from "./SubmissionDetailPage";
import * as submissionRepo from "~/server/repositories/Submissions";
import { getPullRequest } from "~/server/github";
import { notFound } from "next/navigation";
import { findAllWithChildren } from "~/server/repositories/EvaluationCriteria";
import { submitReviewAction } from "../actions";

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
    submission.contributions[0].meta.pull_request.diff_url,
  ).then((r) => r.text());

  const evaluationCriterias = await findAllWithChildren();

  const data = {
    submission,
    evaluationCriterias,
  };

  // const plotScoreData = await getDetailScore(
  //   submission.reviews[0].evaluationCriterias.map((value) => value.id),
  // );
  // console.log(plotScoreData);

  return (
    <SubmissionDetailPage
      data={data}
      submitReviewAction={submitReviewAction}
      diffText={diffText}
    />
  );
}
