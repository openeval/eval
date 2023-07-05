"use client";
import { CandidateOnboardingForm } from "./CandidateOnboardingForm";
import { ConnectGithubAccount } from "./ConnectGithubAccount";
import { useRouter, useSearchParams } from "next/navigation";
const INITIAL_STEP = "profile";
const steps = ["github-connect"] as const;

//we get callback,  can we pass params ?
export async function OnboardingCandidatePage() {
  const router = useRouter();
  const params = useSearchParams();
  const step = params?.get("step");

  return (
    <div>
      {!step && (
        <CandidateOnboardingForm
          onSuccess={() => router.push("candidate?step=github-connect")}
        />
      )}
      {step === "github-connect" && <ConnectGithubAccount />}
    </div>
  );
}
