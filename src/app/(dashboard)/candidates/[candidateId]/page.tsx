import { cache } from "react";

import { findByIdFull } from "~/server/repositories/Candidates";
import CandidateDetailPage from "./CandidateDetailPage";

type CandidateDetailPageProps = {
  params: { candidateId?: string };
};

const getCandidate = cache(async (id) => {
  return await findByIdFull(id);
});

export default async function Page({ params }: CandidateDetailPageProps) {
  const candidate = await getCandidate(params.candidateId);
  return <CandidateDetailPage data={{ candidate }} />;
}
