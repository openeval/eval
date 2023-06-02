import { getCurrentUser } from "~/server/auth";

type CandidateDetailPageProps = {
  params: { candidateId?: string };
};
export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>hello {user.email}</h1>
      details {params.candidateId}
    </div>
  );
}
