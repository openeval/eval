"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { CandidateOnboardingForm } from "./CandidateOnboardingForm";
import { ConnectGithubAccount } from "./ConnectGithubAccount";
import { Success } from "./Success";

//we get callback,  can we pass params ?
export function OnboardingCandidatePage({ createCandidateAction }) {
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
