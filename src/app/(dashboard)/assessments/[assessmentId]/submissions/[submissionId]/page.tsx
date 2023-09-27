import { fetchPullRequest } from "~/server/github";
import { SubmissionDetailPage } from "./SubmissionDetailPage";
import * as submissionRepo from "~/server/repositories/Submissions";
import { notFound } from "next/navigation";

type SubmissionDetailPageProps = {
  params: {
    assessmentId: string;
    submissionId: string;
  };
};

export default async function Page({ params }: SubmissionDetailPageProps) {
  const response = await fetch(
    "https://github.com/openeval/eval/pull/21.diff",
  ).then((r) => r.text());

  const submission = await submissionRepo.findByIdFull(params.submissionId);

  if (!submission) {
    notFound();
  }

  const pr = await fetchPullRequest();

  return <SubmissionDetailPage submission={submission} diffText={response} />;
}
