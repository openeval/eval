"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type { CreateCandidateAction } from "../actions";
import { CandidateOnboardingForm } from "./CandidateOnboardingForm";
import { ConnectGithubAccount } from "./ConnectGithubAccount";
import { Success } from "./Success";

type OnboardingCandidatePageProps = {
  createCandidateAction: CreateCandidateAction;
};
export function OnboardingCandidatePage({
  createCandidateAction,
}: OnboardingCandidatePageProps) {
  const router = useRouter();
  const params = useSearchParams();
  const step = params?.get("step");

  return (
    <div>
      {!step && (
        <CandidateOnboardingForm
          action={createCandidateAction}
          onSuccess={() => router.push("candidate?step=github-connect")}
        />
      )}
      {step === "github-connect" && <ConnectGithubAccount />}
      {step === "success" && <Success onSuccess={() => router.push("/d")} />}
    </div>
  );
}
