import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { createCandidateAction } from "../actions";
import { OnboardingCandidatePage } from "./OnboardingCandidatePage";

export const metadata = {
  title: "Onboarding",
};

export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // if (user.completedOnboarding) {
  //   redirect("/");
  // }

  return (
    <div className="mx-auto max-w-md">
      <OnboardingCandidatePage createCandidateAction={createCandidateAction} />
    </div>
  );
}
