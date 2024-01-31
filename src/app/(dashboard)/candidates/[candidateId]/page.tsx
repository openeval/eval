import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { getCurrentUser } from "~/server/auth";
import { findByIdFull } from "~/server/services/Candidates";
import { updateCandidateAction } from "../action";
import CandidateDetailPage from "./CandidateDetailPage";

type CandidateDetailPageProps = {
  params: { candidateId: string };
};

const getCandidate = cache(async (id) => {
  return await findByIdFull(id);
});

export default async function Page({ params }: CandidateDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const candidate = await getCandidate(params.candidateId);

  if (!candidate) {
    notFound();
  }

  return (
    <CandidateDetailPage
      data={{ candidate }}
      actions={{ updateCandidateAction }}
    />
  );
}
