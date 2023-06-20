type CandidateDetailPageProps = {
  params: { candidateId?: string };
};
export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  return <div>details {params.candidateId}</div>;
}
