import { SubmissionDetailPage } from "./SubmissionDetailPage";
import * as submissionRepo from "~/server/repositories/Submissions";
import { getPullRequest } from "~/server/github";
import { notFound } from "next/navigation";

type SubmissionDetailPageProps = {
  params: {
    assessmentId: string;
    submissionId: string;
  };
};

export default async function Page({ params }: SubmissionDetailPageProps) {
  // need to get this endpoint for changes

  const submission = await submissionRepo.findByIdFull(params.submissionId);

  if (!submission) {
    notFound();
  }

  const diffText = await fetch(
    submission.contributions[0].meta.pull_request.diff_url,
  ).then((r) => r.text());

  // TODO: get the full pull request from github
  // const pr = await getPullRequest("openeval", "eval", 26);
  // console.log(pr);
  return <SubmissionDetailPage submission={submission} diffText={diffText} />;
}
