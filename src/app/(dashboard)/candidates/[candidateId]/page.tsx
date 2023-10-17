import CandidateDetailPage from "./CandidateDetailPage";
import { findById } from "~/server/repositories/Candidates";
import { cache } from "react";

type CandidateDetailPageProps = {
  params: { candidateId?: string };
};

const getCandidate = cache(async (id) => {
  return await findById(id);
});

export default async function Page({ params }: CandidateDetailPageProps) {
  const data = await getCandidate(params.candidateId);

  return <CandidateDetailPage data={data} />;
}
