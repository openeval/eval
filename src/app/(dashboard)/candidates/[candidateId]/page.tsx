import { getCurrentUser } from "~/server/auth";

type CandidateDetailPageProps = {
  params: { candidateId?: string };
};
export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const user = await getCurrentUser();
  return <div>details {params.candidateId}</div>;
}
