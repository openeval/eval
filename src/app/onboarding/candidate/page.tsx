import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";

import { OnboardingCandidatePage } from "./OnboardingCandidatePage";

//we get callback,  can we pass params ?
export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding) {
    redirect("/");
  }

  return <OnboardingCandidatePage />;
}
