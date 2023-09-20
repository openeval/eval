import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";

import { OnboardingCandidatePage } from "./OnboardingCandidatePage";
import { createCandidateAction } from "../actions";
//we get callback,  can we pass params ?
export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-md">
      <OnboardingCandidatePage createCandidateAction={createCandidateAction} />
    </div>
  );
}
