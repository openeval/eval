import { getCurrentUser } from "~/server/auth";
import "react-diff-view/style/index.css";
import { fetchPullRequest } from "~/server/github";
import { SubmissionDetailPage } from "./SubmissionDetailPage";
type CandidateDetailPageProps = {
  params: {
    assessmentId: string;
    candidateId: string;
  };
};
export default async function Page({ params }: CandidateDetailPageProps) {
  const _user = await getCurrentUser();

  const response = await fetch(
    "https://github.com/openeval/eval/pull/21.diff",
  ).then((r) => r.text());

  const pr = await fetchPullRequest();
  console.log(response);
  return <SubmissionDetailPage submissionId={"1"} diffText={response} />;
}
