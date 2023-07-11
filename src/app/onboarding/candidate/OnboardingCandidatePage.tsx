"use client";
import { CandidateOnboardingForm } from "./CandidateOnboardingForm";
import { ConnectGithubAccount } from "./ConnectGithubAccount";
import { Success } from "./Success";
import { useRouter, useSearchParams } from "next/navigation";
const INITIAL_STEP = "profile";
const steps = ["github-connect"] as const;

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
